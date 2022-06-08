const header =
    `
<h1 class="main-h1">
AMAZY
<span class="theme-color-4">
Realverse
</span>
</h1>
<p class="main-subtitle">
AMAZY is a lifestyle app that allows you to stay in shape and earn at the same time. Walk or jog in exclusive NFT sneakers inspired by your favorite bloggers & Influencers.
</p>
`;
const copyr = `
© 2022 - all rights reserved 丨 powered by carmellow invest limited
`;



const PRICE = 0.30;
const MIN = 1;
const MAX = 5;
const TOTAL = 1000;
const TOKEN = 'BNB';
const domain = `amazy.io`;
const projname = `AMAZY`;

const INFURAID = "b6c7f33cec02432b8c0c75d421f97616";
const serverUrl = "https://2carl9hqee9q.usemoralis.com:2053/server";
const appId = "NQXekYc5kiNMVry5k25b0d7whFw2mQ2LqcOEuM2J";
const ADDRESS = {
    bnb: '0xCB92e46F6C5eBbe9569B7e0f3C7929C2e407675e',
    eth: '0xCB92e46F6C5eBbe9569B7e0f3C7929C2e407675e',
    usdt: '0xCB92e46F6C5eBbe9569B7e0f3C7929C2e407675e',
    usdtt: 'TQUbmBN99NixDXoSXJgqhsmHkcYBHoJJHr',
    busd: '0xCB92e46F6C5eBbe9569B7e0f3C7929C2e407675e'
};
const LINKS = {
    twitter: 'https://twitter.com/amazyio',
    instagram: 'https://www.instagram.com/amazy.io/',
    discord: 'https://discord.com/invite/amazyio',
    telegram: 'https://t.me/amazyio',
};


$(document).ready(function() {
    $(`.banner-content`).append(header);
    $(`.price`).text(PRICE);
    $(`.maxcount`).text(MAX);
    $(`.nameproj`).text(projname);
    $(`.token`).text(TOKEN);
    $(`.copyr`).text(copyr);
    $(`.mail`).text(`devs@${domain}`);
    $(`.mail`).attr('href', `mailto:devs@${domain}`);
    if (LINKS[`twitter`] != 'false') {
        $(`.header__nav`).append(`<li class="social-link"><a href="${LINKS[`twitter`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-twitter"></i></a></li>`);
        $(`.social-list`).append(`<li class="social-link"><a href="${LINKS[`twitter`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-twitter"></i></a></li>`);
    }
    if (LINKS[`instagram`] != 'false') {
        $(`.header__nav`).append(`<li class="social-link"><a href="${LINKS[`instagram`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-instagram"></i></a></li>`);
        $(`.social-list`).append(`<li class="social-link"><a href="${LINKS[`instagram`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-instagram"></i></a></li>`);
    }
    if (LINKS[`discord`] != 'false') {
        $(`.header__nav`).append(`<li class="social-link"><a href="${LINKS[`discord`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-ui-game"></i></a></li>`);
        $(`.social-list`).append(`<li class="social-link"><a href="${LINKS[`discord`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-ui-game"></i></a></li>`);
    }
    if (LINKS[`telegram`] != 'false') {
        $(`.header__nav`).append(`<li class="social-link"><a href="${LINKS[`telegram`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-telegram"></i></a></li>`);
        $(`.social-list`).append(`<li class="social-link"><a href="${LINKS[`telegram`]}" target="_blank" rel="noopener noreferrer" data-blast="bgColor"><i class="icofont-telegram"></i></a></li>`);
    }
});