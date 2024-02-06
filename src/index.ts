import fetch from "node-fetch";
import NodeNotifier from 'node-notifier';

const donotsTicketPageUrl: string = "https://donots.merchcowboy.com/tickets/";


async function fetchShopContent(): Promise<string> {
    const resp = await fetch(donotsTicketPageUrl) 
    
    const te: TextDecoder = new TextDecoder();
    return te.decode(await resp.arrayBuffer());
    
}


(async function loop() {
    const resp: string = (await fetchShopContent()).toLocaleLowerCase();
    const delayed: boolean = resp.includes('vvk-start verschoben');

    if(delayed){
        NodeNotifier.notify('Please Wait')
        console.log('please wait');
        setTimeout(
            () => loop(), 1000 * 1
        );
    }
    else {
        NodeNotifier.notify('Get a Ticket!!!')
    }
})();