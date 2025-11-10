# Contributing to TradeSense

Thank you for your interest in contributing to TradeSense! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/tradesense/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Device/OS information

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Write/update tests
   - Update documentation

4. **Test your changes**
   ```bash
   npm test
   npm run type-check
   npm run lint
   ```

5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new indicator"
   git commit -m "fix: resolve calculation bug"
   git commit -m "docs: update README"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/tradesense.git
cd tradesense

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your API keys

# Start development
npm start
```

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

## Testing

- Write unit tests for business logic
- Test indicator calculations thoroughly
- Test error handling
- Maintain >80% coverage for core modules

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, missing semicolons, etc.
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Update README.md with details of changes if needed
2. Update documentation
3. Add tests for new features
4. Ensure all tests pass
5. Request review from maintainers
6. Address review feedback
7. Squash commits if requested
8. PR will be merged after approval

## Project Structure

```
src/
├── core/          # Business logic, indicators
├── services/      # External services
├── store/         # State management
├── hooks/         # Custom hooks
├── components/    # React components
├── utils/         # Helper functions
└── types/         # TypeScript types
```

## Areas for Contribution

### High Priority
- Additional technical indicators (MACD, Stochastic, etc.)
- More currency pairs support
- Advanced backtesting features
- Performance optimizations
- Test coverage improvements

### Medium Priority
- UI/UX enhancements
- Additional chart types
- Cryptocurrency support
- Social features
- Export/import functionality

### Good First Issues
- Documentation improvements
- Code comments
- Minor bug fixes
- UI polish
- Translation support

## Questions?

- Open a [Discussion](https://github.com/yourusername/tradesense/discussions)
- Ask in PR comments
- Email: your.email@example.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TradeSense! 🎉
