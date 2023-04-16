using Microsoft.Data.SqlClient;
using PUGPlannerAPI.Models;
using PUGPlannerAPI.Utils;

namespace PUGPlannerAPI.Repositories
{
    public class PronounRepository : BaseRepository, IPronounRepository
    {
        public PronounRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Queries the Pronoun table for all entries
        /// </summary>
        /// <returns>Pronoun object list</returns>
        public List<Pronoun> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pn.Id, pn.[Name]
                        FROM Pronoun pn";

                    List<Pronoun> pronouns = new List<Pronoun>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        pronouns.Add(NewPronounFromReader(reader));
                    }
                    reader.Close();

                    return pronouns;
                }
            }
        }

        /// <summary>
        /// Instantiates a new Pronoun object through the SQL Data Reader
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Pronoun object</returns>
        private Pronoun NewPronounFromReader(SqlDataReader reader)
        {
            return new Pronoun()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
            };
        }

    }
}
