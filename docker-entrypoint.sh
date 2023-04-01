set -e

/var/opt/mssql/bin/sqlservr &

sleep 30s

/var/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /app/SQL/query_1_database_create.sql
/var/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /app/SQL/query_2_database_seed.sql

fg %1