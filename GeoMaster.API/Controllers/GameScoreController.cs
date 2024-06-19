using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.Scores;
using Microsoft.AspNetCore.Mvc;

namespace GeoMaster.API.Controllers
{
    [ApiController]
    [Route("/api/game-score")]
    public class GameScoreController : Controller
    {
        private readonly IGameScoreRepository _gameScoreRepository;

        public GameScoreController(IGameScoreRepository gameScoreRepository)
        {
            _gameScoreRepository = gameScoreRepository;
        }

        [HttpPost("add")]
        [ProducesResponseType(typeof(GameScore), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddGameScore(GameScore gameScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _gameScoreRepository.SaveGameScoreAsync(gameScore);
            return Ok(gameScore);
        }

        [HttpGet("get/{gameType}")]
        [ProducesResponseType(typeof(List<GameScore>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetGameScores(string gameType)
        {
            var gameScores = await _gameScoreRepository.GetGameScoresAsync(gameType);

            if (gameScores is null || gameScores.Count == 0)
            {
                return NotFound();
            }

            return Ok(gameScores);
        }

        [HttpDelete("delete-all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteAllData()
        {
            try
            {
                await _gameScoreRepository.DeleteAllDataAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the data.");
            }
        }
    }
}
