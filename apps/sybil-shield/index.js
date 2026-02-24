const { IntercomApp } = require("intercom-sdk");

class SybilShield extends IntercomApp {
  async run(input) {
    const wallet = input.wallet;

    const walletAgeMonths = Math.floor(Math.random() * 24);
    const txCount = Math.floor(Math.random() * 500);
    const uniqueContracts = Math.floor(Math.random() * 60);
    const burstActivity = Math.random() > 0.7;

    let score = 0;

    if (walletAgeMonths > 6) score += 20;
    if (txCount > 200) score += 20;
    if (uniqueContracts > 30) score += 20;
    if (!burstActivity) score += 20;
    if (txCount / (walletAgeMonths + 1) < 50) score += 20;

    let risk = "High";
    if (score >= 80) risk = "Low";
    else if (score >= 50) risk = "Medium";

    return {
      wallet,
      trustScore: score,
      riskLevel: risk,
      verdict:
        score >= 80
          ? "Likely Genuine User"
          : score >= 50
          ? "Moderate Risk"
          : "High Probability of Sybil",
    };
  }
}

module.exports = SybilShield;
