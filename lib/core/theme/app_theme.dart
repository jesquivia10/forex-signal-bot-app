import 'package:flutter/material.dart';

class AppTheme {
  // Colors
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color secondaryColor = Color(0xFF03A9F4);
  static const Color successColor = Color(0xFF4CAF50);
  static const Color dangerColor = Color(0xFFF44336);
  static const Color warningColor = Color(0xFFFF9800);
  
  // Light Theme Colors
  static const Color lightBackground = Color(0xFFF5F5F5);
  static const Color lightSurface = Colors.white;
  static const Color lightText = Color(0xFF212121);
  static const Color lightTextSecondary = Color(0xFF757575);
  
  // Dark Theme Colors
  static const Color darkBackground = Color(0xFF121212);
  static const Color darkSurface = Color(0xFF1E1E1E);
  static const Color darkText = Color(0xFFE0E0E0);
  static const Color darkTextSecondary = Color(0xFFB0B0B0);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: primaryColor,
        secondary: secondaryColor,
        surface: lightSurface,
        background: lightBackground,
        error: dangerColor,
      ),
      scaffoldBackgroundColor: lightBackground,
      cardTheme: CardTheme(
        color: lightSurface,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(color: lightText, fontSize: 32, fontWeight: FontWeight.bold),
        displayMedium: TextStyle(color: lightText, fontSize: 28, fontWeight: FontWeight.bold),
        displaySmall: TextStyle(color: lightText, fontSize: 24, fontWeight: FontWeight.bold),
        headlineMedium: TextStyle(color: lightText, fontSize: 20, fontWeight: FontWeight.w600),
        titleLarge: TextStyle(color: lightText, fontSize: 18, fontWeight: FontWeight.w600),
        bodyLarge: TextStyle(color: lightText, fontSize: 16),
        bodyMedium: TextStyle(color: lightTextSecondary, fontSize: 14),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.dark(
        primary: primaryColor,
        secondary: secondaryColor,
        surface: darkSurface,
        background: darkBackground,
        error: dangerColor,
      ),
      scaffoldBackgroundColor: darkBackground,
      cardTheme: CardTheme(
        color: darkSurface,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: darkSurface,
        foregroundColor: darkText,
        elevation: 0,
        centerTitle: true,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
      textTheme: TextTheme(
        displayLarge: const TextStyle(color: darkText, fontSize: 32, fontWeight: FontWeight.bold),
        displayMedium: const TextStyle(color: darkText, fontSize: 28, fontWeight: FontWeight.bold),
        displaySmall: const TextStyle(color: darkText, fontSize: 24, fontWeight: FontWeight.bold),
        headlineMedium: const TextStyle(color: darkText, fontSize: 20, fontWeight: FontWeight.w600),
        titleLarge: const TextStyle(color: darkText, fontSize: 18, fontWeight: FontWeight.w600),
        bodyLarge: const TextStyle(color: darkText, fontSize: 16),
        bodyMedium: const TextStyle(color: darkTextSecondary, fontSize: 14),
      ),
    );
  }
}
