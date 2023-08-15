    const userData = [
        {
            user: 'Angel',
            mail: 'angel@gmail.com',
            pass: '12345',
            balance: 100
        },
        {
            user: 'Rocio',
            mail: 'rocio@gmail.com',
            pass: '123456',
            balance: 100
        },
        {
            user: 'Tamara',
            mail: 'tamara@gmail.com',
            pass: '1234567',
            balance: 100
        },
        {
            user: 'Miguel',
            mail: 'miguel@gmail.com',
            pass: '1234',
            balance: 500
        }
    ];

    let form = document.getElementById('form');

    function sendError(type, targetClass, hideClass) {
        let changeElement = document.getElementById(`${type}Error`);

            changeElement.classList.remove(hideClass);
            changeElement.classList.add(targetClass);
            setTimeout(() => {
                changeElement.classList.remove(targetClass);
                changeElement.classList.add(hideClass);
            }, 5000);}

    function hideStart() {
        let hideSt = document.getElementById('start-show');
        let hideFt = document.getElementById('footer');
            hideSt.classList.remove('main');
            hideFt.classList.remove('footer');
            hideSt.classList.add('main--hide');
            hideFt.classList.add('footer--hide');}

    function showMenu() {
        let showMe = document.getElementById('menu-show');
            showMe.classList.remove('main-atm--hide');
            showMe.classList.add('main-atm');}

    let welcome = document.getElementById('welcome');

    function showWelcomeMessage(username) {
        welcome.textContent = `¡Bienvenido, ${username}!`;}

    let currentUserIndex = -1;
    let currentBalanceAmount = 0;

    function validate(userInsert, passwordInsert) {
        let foundUser = false;

        for (let index = 0; index < userData.length; index++) {
            if (userInsert === userData[index].mail && passwordInsert === userData[index].pass) {
                foundUser = true;
                hideStart();
                showMenu();
                showWelcomeMessage(userData[index].user);
                currentUserIndex = index;
                currentBalanceAmount = userData[index].balance;
                return;
            } else if (userInsert === userData[index].mail) {
                sendError('password', 'form__span', 'form__span--hide');
                return;
            }
        }
        if (!foundUser) {
            sendError('username', 'form__span', 'form__span--hide');
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let usernameJoined = document.getElementById('username').value;
        let passwordJoined = document.getElementById('password').value;

        validate(usernameJoined, passwordJoined);
    });

    let btnConsultBalance = document.getElementById('btnConsultBalance');
    let availableBalance = document.getElementById('availableBalance');
    let currentBalance = document.getElementById('currentBalance');
    let depositAmount = document.getElementById('depositAmount');
    let btnDeposit = document.getElementById('btnDeposit');
    let depositedAmountInfo = document.getElementById('depositedAmountInfo');
    let withdrawAmount = document.getElementById('withdrawAmount');
    let btnWithdraw = document.getElementById('btnWithdraw');
    let withdrawnAmountInfo = document.getElementById('withdrawnAmountInfo');

    btnConsultBalance.addEventListener('click', () => {
        availableBalance.textContent = `Saldo disponible: $${currentBalanceAmount}`;
    });

    btnDeposit.addEventListener('click', () => {
        let depositValue = parseInt(depositAmount.value);

        if (depositValue > 0 && currentBalanceAmount + depositValue <= 990) {
            userData[currentUserIndex].balance += depositValue;
            currentBalanceAmount = userData[currentUserIndex].balance;
            depositedAmountInfo.textContent = `Has depositado: $${depositValue}`;
            availableBalance.textContent = `Saldo disponible: $${currentBalanceAmount}`;
            depositAmount.value = '';
        } else if (depositValue <= 0) {
            sendError('max', 'maxerror', 'maxerror--hide');
        } else {
            sendError('max', 'maxerror', 'maxerror--hide');
        }
    });

    btnWithdraw.addEventListener('click', () => {
        let withdrawValue = parseFloat(withdrawAmount.value);

        if (!isNaN(withdrawValue) && withdrawValue > 0 && currentBalanceAmount - withdrawValue >= 10) {
            userData[currentUserIndex].balance -= withdrawValue;
            currentBalanceAmount = userData[currentUserIndex].balance;
            withdrawnAmountInfo.textContent = `Has retirado: $${withdrawValue}`;
            availableBalance.textContent = `Saldo disponible: $${currentBalanceAmount}`;
            withdrawAmount.value = '';
        } else if (withdrawValue <= 0) {
            sendError('min', 'minerror', 'minerror--hide');
        } else if (currentBalanceAmount - withdrawValue < 10) {
            sendError('min', 'minerror', 'minerror--hide');
        }
    });

    