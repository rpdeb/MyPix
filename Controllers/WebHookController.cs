using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MyPix.Models;
using MyPix.Hubs;

namespace MyPix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebHookController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public WebHookController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async void receberDadosWebHook(PagamentoPix pagamentoPix)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", pagamentoPix.pix[0].txid, pagamentoPix.pix[0].valor);
        }
    }
}
