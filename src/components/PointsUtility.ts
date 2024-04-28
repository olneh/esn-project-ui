class PointsUtility {
    static getLevel(points: number): string {
        if (points >= 20) {
            return "👑 Erasmus King";
        } else if (points >= 15) {
            return "🐰 Tutuic's Bestie";
        } else if (points >= 12) {
            return "🎓 TalTech IC Guru";
        } else if (points >= 9) {
            return "🎉 Party Maestro";
        } else if (points >= 7) {
            return "🎈 Event Enthusiast";
        } else if (points >= 3) {
            return "🦋 Social Butterfly";
        } else if (points >= 1) {
            return "🤝 Helping Rookie";
        } else {
            return "🍀 Lucky Newbie";
        }
    }
}

export default PointsUtility;
