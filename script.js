let argent = 0;
let revenu = 0;
let clickPower = 1;

let currentClickUpgrade = null;
let currentPassiveUpgrade = null;

let millionPopupShown = false;

const money = document.getElementById("money");
const income = document.getElementById("income");
const clickBtn = document.getElementById("clickBtn");

const clickShop = document.getElementById("click-shop");
const passiveShop = document.getElementById("passive-shop");

function updateDisplay() {
    money.textContent = argent + " $";
    income.textContent = revenu + " $/sec";
    clickBtn.textContent = "+" + clickPower + " $";
}

clickBtn.addEventListener("click", () => {
    argent += clickPower;
    updateDisplay();
});

class Upgrade {
    constructor(name, price, bonus, type) {
        this.name = name;
        this.price = price;
        this.bonus = bonus;
        this.type = type;

        this.element = document.createElement("div");
        this.element.className = "shop-item";
        this.element.innerHTML = `
            <strong>${name}</strong><br>
            Prix : ${price}$<br>
            Bonus : +${bonus} ${type === "click" ? "/clic" : "/sec"}
            <br><button>Acheter</button>
        `;

        this.element.querySelector("button")
            .addEventListener("click", () => this.buy());
        
        // Ajout dans le bon shop
        if (type === "click") clickShop.appendChild(this.element);
        else passiveShop.appendChild(this.element);
    }

    buy() {
        if (argent < this.price) return;
        argent -= this.price;

        if (this.type === "click") {
            if (currentClickUpgrade) currentClickUpgrade.element.remove();
            clickPower = this.bonus;
            currentClickUpgrade = this;
        }

        if (this.type === "passif") {
            if (currentPassiveUpgrade) currentPassiveUpgrade.element.remove();
            revenu = this.bonus;
            currentPassiveUpgrade = this;
        }

        this.element.remove();
        updateDisplay();
    }
}

setInterval(() => {
    argent += revenu;
    updateDisplay();

    if (!millionPopupShown && argent >= 1_000_000) {
        millionPopupShown = true;
        alert("🔥 Félicitations ! Tu as atteint 1 000 000 $ !");
    }
}, 1000);

// amelioration /clic
new Upgrade("+2/clic", 30, 2, "click");
new Upgrade("+5/clic", 50, 5, "click");
new Upgrade("+8/clic", 75, 8, "click");
new Upgrade("+10/clic", 100, 10, "click");
new Upgrade("+15/clic", 200, 15, "click");
new Upgrade("+20/clic", 500, 20, "click");
new Upgrade("+25/clic", 700, 25, "click");
new Upgrade("+50/clic", 1000, 50, "click");
new Upgrade("+100/clic", 18000, 100, "click");
new Upgrade("+200/clic", 3000, 200, "click");
new Upgrade("+400/clic", 3500, 400, "click");
new Upgrade("+800/clic", 4000, 800, "click");
new Upgrade("+1000/clic", 5000, 1000, "click");
new Upgrade("+5000/clic", 100000, 5000, "click");
new Upgrade("+10000/clic", 150000, 10000, "click");
new Upgrade("+15000/clic", 200000, 15000, "click");
new Upgrade("+20000/clic", 250000, 20000, "click");
new Upgrade("+25000/clic", 300000, 25000, "click");
new Upgrade("+30000/clic", 350000, 30000, "click");

// amelioration passive
new Upgrade("+1/sec", 15, 1, "passif");
new Upgrade("+2/sec", 100, 2, "passif");
new Upgrade("+10/sec", 500, 10, "passif");
new Upgrade("+12/sec", 520, 12, "passif");
new Upgrade("+14/sec", 560, 14, "passif");
new Upgrade("+16/sec", 580, 16, "passif");
new Upgrade("+18/sec", 600, 18, "passif");
new Upgrade("+27/sec", 1000, 27, "passif");
new Upgrade("+20/sec", 1200, 20, "passif");
new Upgrade("+20/sec", 1400, 20, "passif");
new Upgrade("+20/sec", 1600, 20, "passif");
new Upgrade("+20/sec", 1800, 20, "passif");
new Upgrade("+20/sec", 2000, 20, "passif");
new Upgrade("+100/sec", 3500, 100, "passif");
new Upgrade("+200/sec", 6000, 200, "passif");
new Upgrade("+500/sec", 10000, 500, "passif");
new Upgrade("+1,000/sec", 100, 1000, "passif");
new Upgrade("+5000/sec", 15000, 5000, "passif");
new Upgrade("+10,000/sec", 175000, 10000, "passif");