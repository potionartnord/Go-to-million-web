let argent = 0;
let revenu = 0;
let clickPower = 1;
let currentClickUpgrade = null;
let currentPassiveUpgrade = null;

const money = document.getElementById("money");
const income = document.getElementById("income");
const clickBtn = document.getElementById("clickBtn");
const shop = document.getElementById("shop");

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

        shop.appendChild(this.element);
    }

    buy() {
        if (argent < this.price) return;
        argent -= this.price;

        // Amélioration cliqué ou passive
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

        // Supprime l'upgrade achetée
        this.element.remove();
        updateDisplay();
    }
}


new Upgrade("+2/clic", 30, 2, "click");
new Upgrade("+5/clic", 100, 5, "click");
new Upgrade("+10/clic", 300, 10, "click");

new Upgrade("+1/sec", 20, 1, "passif");
new Upgrade("+5/sec", 100, 5, "passif");
new Upgrade("+20/sec", 500, 20, "passif");

setInterval(() => {
    argent += revenu;
    updateDisplay();
}, 1000);
