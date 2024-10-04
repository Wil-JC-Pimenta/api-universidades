# Use a imagem oficial do PostgreSQL
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=Database7894
ENV POSTGRES_DB=escola

# Exponha a porta padrão do PostgreSQL
EXPOSE 5432
