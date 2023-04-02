using Microsoft.Data.SqlClient;
using PUGPlannerAPI.Models;
using PUGPlannerAPI.Utils;

namespace PUGPlannerAPI.Repositories
{
    public class PositionRepository : BaseRepository, IPositionRepository
    {
        public PositionRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Queries the Position table for all entries
        /// </summary>
        /// <returns>Position object list</returns>
        public List<Position> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.[Name], p.FullName
                        FROM Position p";

                    List<Position> positions = new List<Position>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        positions.Add(NewPositionFromReader(reader));
                    }
                    reader.Close();

                    return positions;
                }
            }
        }

        /// <summary>
        /// Instantiates a new Position object through the SQL Data Reader
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Position object</returns>
        private Position NewPositionFromReader(SqlDataReader reader)
        {
            return new Position()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                FullName = DbUtils.GetString(reader, "FullName")
            };
        }

    }
}
