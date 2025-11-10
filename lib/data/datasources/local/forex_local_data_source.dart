import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../../models/price_data.dart';
import '../../../core/constants/app_constants.dart';

class ForexLocalDataSource {
  static Database? _database;
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, AppConstants.databaseName);
    
    return await openDatabase(
      path,
      version: AppConstants.databaseVersion,
      onCreate: _onCreate,
    );
  }
  
  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE price_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        symbol TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        open REAL NOT NULL,
        high REAL NOT NULL,
        low REAL NOT NULL,
        close REAL NOT NULL,
        volume REAL,
        UNIQUE(symbol, timestamp)
      )
    ''');
    
    await db.execute('''
      CREATE TABLE signals (
        id TEXT PRIMARY KEY,
        pair_symbol TEXT NOT NULL,
        type TEXT NOT NULL,
        confidence TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        current_price REAL NOT NULL,
        reason TEXT NOT NULL,
        bollinger_upper REAL,
        bollinger_middle REAL,
        bollinger_lower REAL,
        rsi REAL,
        sma20 REAL,
        sma50 REAL,
        ema20 REAL,
        ema50 REAL
      )
    ''');
    
    await db.execute('''
      CREATE INDEX idx_price_data_symbol_timestamp 
      ON price_data(symbol, timestamp DESC)
    ''');
    
    await db.execute('''
      CREATE INDEX idx_signals_timestamp 
      ON signals(timestamp DESC)
    ''');
  }
  
  Future<void> savePriceData(String symbol, List<PriceData> prices) async {
    final db = await database;
    final batch = db.batch();
    
    for (final price in prices) {
      batch.insert(
        'price_data',
        {
          'symbol': symbol,
          'timestamp': price.timestamp.millisecondsSinceEpoch,
          'open': price.open,
          'high': price.high,
          'low': price.low,
          'close': price.close,
          'volume': price.volume,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    
    await batch.commit(noResult: true);
  }
  
  Future<List<PriceData>> getPriceData(
    String symbol,
    int limit,
  ) async {
    final db = await database;
    final results = await db.query(
      'price_data',
      where: 'symbol = ?',
      whereArgs: [symbol],
      orderBy: 'timestamp ASC',
      limit: limit,
    );
    
    return results.map((row) => PriceData(
      timestamp: DateTime.fromMillisecondsSinceEpoch(row['timestamp'] as int),
      open: row['open'] as double,
      high: row['high'] as double,
      low: row['low'] as double,
      close: row['close'] as double,
      volume: row['volume'] as double?,
    )).toList();
  }
  
  Future<void> clearOldData(String symbol, DateTime before) async {
    final db = await database;
    await db.delete(
      'price_data',
      where: 'symbol = ? AND timestamp < ?',
      whereArgs: [symbol, before.millisecondsSinceEpoch],
    );
  }
}
