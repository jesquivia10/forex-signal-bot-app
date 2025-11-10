import '../models/price_data.dart';
import '../datasources/remote/forex_remote_data_source.dart';
import '../datasources/local/forex_local_data_source.dart';

class ForexRepository {
  final ForexRemoteDataSource _remoteDataSource;
  final ForexLocalDataSource _localDataSource;
  
  ForexRepository({
    ForexRemoteDataSource? remoteDataSource,
    ForexLocalDataSource? localDataSource,
  })  : _remoteDataSource = remoteDataSource ?? ForexRemoteDataSource(),
        _localDataSource = localDataSource ?? ForexLocalDataSource();
  
  Future<List<PriceData>> getMarketData(
    String symbol,
    int limit,
    {bool forceRefresh = false}
  ) async {
    try {
      if (forceRefresh) {
        final data = await _remoteDataSource.getHistoricalData(symbol, limit);
        await _localDataSource.savePriceData(symbol, data);
        return data;
      }
      
      // Try local first
      final localData = await _localDataSource.getPriceData(symbol, limit);
      if (localData.length >= limit) {
        return localData;
      }
      
      // Fetch from remote if local is insufficient
      final remoteData = await _remoteDataSource.getHistoricalData(symbol, limit);
      await _localDataSource.savePriceData(symbol, remoteData);
      return remoteData;
    } catch (e) {
      // Fallback to local if remote fails
      final localData = await _localDataSource.getPriceData(symbol, limit);
      if (localData.isNotEmpty) {
        return localData;
      }
      rethrow;
    }
  }
  
  Future<PriceData> getCurrentPrice(String symbol) async {
    return await _remoteDataSource.getCurrentPrice(symbol);
  }
}
