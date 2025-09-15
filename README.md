# Personal Investment Assistant

AI-powered investment advisory platform for individual investors.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication
- **Portfolio Management**: Track your investments and holdings
- **Market Data**: Real-time stock prices and market information
- **AI-Powered Advice**: Personalized investment recommendations
- **Risk Assessment**: Customized advice based on risk tolerance
- **RAG-Enhanced Analysis**: News and earnings analysis

## 🏗️ Architecture

```
Frontend (Next.js) ←→ Backend (FastAPI) ←→ External APIs
                           ↓
                    PostgreSQL + Redis + Elasticsearch
```

## 🛠️ Technology Stack

### Backend
- **Python 3.11** with FastAPI
- **PostgreSQL** for user data and transactions
- **Redis** for caching
- **Elasticsearch** for news search and RAG
- **SQLAlchemy** with async support
- **Alembic** for database migrations

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Hook Form** with Zod validation

### External APIs
- **Yahoo Finance** for stock data
- **OpenAI GPT** for AI recommendations
- **Alpha Vantage** for technical indicators

## 📦 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd personal-investment-assistant
cp .env.example .env
# Edit .env with your API keys
```

### 2. Initialize Project
```bash
make init
```

### 3. Start Development Environment
```bash
make dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### 4. Demo Login
```
Email: demo@example.com
Password: demo123
```

## 🔧 Development Commands

```bash
# Start development environment
make dev

# Run tests
make test

# Code formatting and linting
make format
make lint

# Database operations
make db-migrate
make db-seed
make db-reset

# View logs
make logs
make logs-api
make logs-frontend

# Stop services
make stop

# Clean up
make clean
```

## 📝 API Documentation

Once running, visit http://localhost:8000/docs for interactive API documentation.

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/token` - OAuth2 token endpoint

#### User Profile
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

#### Portfolio
- `GET /api/v1/portfolio` - Get user portfolio
- `POST /api/v1/portfolio` - Add portfolio item
- `PUT /api/v1/portfolio/{id}` - Update portfolio item
- `DELETE /api/v1/portfolio/{id}` - Delete portfolio item

## 🧪 Testing

```bash
# Run all tests
make test

# Run specific test types
make test-unit
make test-integration
make test-e2e
```

## 🚀 Deployment

### Staging
```bash
make deploy-staging
```

### Production
```bash
make deploy-prod
```

## 📊 Monitoring

The application includes structured logging and health checks:

- Health check: `GET /health`
- Metrics endpoint: `GET /metrics`
- Logs: JSON structured logs for production

## 🔒 Security

- JWT token authentication with refresh tokens
- Password hashing with bcrypt
- CORS protection
- Input validation with Pydantic
- SQL injection protection with SQLAlchemy
- Rate limiting on API endpoints

## 🐛 Troubleshooting

### Common Issues

**Database connection failed**
```bash
# Check if PostgreSQL is running
make status
# Reset database
make db-reset
```

**Frontend not loading**
```bash
# Check if all services are running
make status
# View frontend logs
make logs-frontend
```

**API authentication errors**
```bash
# Clear browser storage and re-login
# Check JWT secret in .env file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Roadmap

### Phase 2 (Next 6 weeks)
- [ ] AI chat interface
- [ ] RAG-powered news analysis
- [ ] Advanced portfolio analytics
- [ ] Real-time market data

### Phase 3 (Following 4 weeks)
- [ ] Mobile app
- [ ] Voice interface
- [ ] Social features
- [ ] Advanced AI models

## 📞 Support

For issues and questions:
- Check the [Issues](link-to-issues) page
- Review the API documentation at `/docs`
- Check the troubleshooting section above