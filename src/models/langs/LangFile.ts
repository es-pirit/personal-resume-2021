export enum LangCode { zht, en }
export type LangCodeKeys = keyof typeof LangCode;

export default class
{
    author = "author";
    nav = {
        resume: "nav.resume",
        portfolio: "nav.portfolio"
    };
    implements = {
        resume: [
            "implements.resume[0]", "implements.resume[1]", "implements.resume[2]"
        ],
        portfolio: [
            "implements.portfolio[0]", "implements.portfolio[1]", "implements.portfolio[2]", "implements.portfolio[3]"
        ]
    };
    titles = {
        intro: "titles.intro",
        experiences: "titles.experiences",
        education: "titles.education",
        skills: "titles.skills",
        description: "titles.description",
        points: "titles.points",
        demo: "titles.demo"
    };
    intro = [
        "intro[0]", "intro[1]", "intro[2]"
    ];
    experiences = [
        {
            name: "experiences[0].name",
            content: [
                "experiences[0].content[0]", "experiences[0].content[1]", "experiences[0].content[2]"
            ]
        },
        {
            name: "experiences[1].name",
            content: [
                "experiences[1].content[0]", "experiences[1].content[1]", "experiences[1].content[2]"
            ]
        },
        {
            name: "experiences[2].name",
            content: [
                "experiences[2].content[0]", "experiences[2].content[1]"
            ]
        },
        {
            name: "experiences[3].name",
            content: [
                "experiences[3].content[0]", "experiences[3].content[1]", "experiences[3].content[2]"
            ]
        }
    ];
    education = [
        {
            name: "education[0].name",
            content: [
                "education[0].content[0]", "education[0].content[1]", "education[0].content[2]"
            ]
        }
    ];
    skills = [
        {
            name: "skills[0].name",
            content: [
                "skills[0].content[0]", "skills[0].content[1]", "skills[0].content[2]", "skills[0].content[3]", "skills[0].content[4]"
            ]
        },
        {
            name: "skills[1].name",
            content: [
                "skills[1].content[0]", "skills[1].content[1]", "skills[1].content[2]", "skills[1].content[3]"
            ]
        },
        {
            name: "skills[2].name",
            content: [
                "skills[2].content[0]", "skills[2].content[1]", "skills[2].content[2]", "skills[2].content[3]", "skills[2].content[4]"
            ]
        }
    ];
    portfolio = {
        "panda-mobile": {
            name: "portfolio.panda-mobile.name",
            note: "portfolio.panda-mobile.note",
            description: [
                "portfolio.panda-mobile.description[0]", "portfolio.panda-mobile.description[1]", "portfolio.panda-mobile.description[2]"
            ],
            points: [
                "portfolio.panda-mobile.points[0]", "portfolio.panda-mobile.points[1]", "portfolio.panda-mobile.points[2]", "portfolio.panda-mobile.points[3]"
            ]
        },
        "live-casino": {
            name: "portfolio.live-casino.name",
            note: "portfolio.live-casino.note",
            description: [
                "portfolio.live-casino.description[0]", "portfolio.live-casino.description[1]"
            ],
            points: [
                "portfolio.live-casino.points[0]", "portfolio.live-casino.points[1]", "portfolio.live-casino.points[2]"
            ]
        },
        "summon-magicrystal": {
            name: "portfolio.summon-magicrystal.name",
            note: "portfolio.summon-magicrystal.note",
            description: [
                "portfolio.summon-magicrystal.description[0]", "portfolio.summon-magicrystal.description[1]"
            ],
            points: [
                "portfolio.summon-magicrystal.points[0]", "portfolio.summon-magicrystal.points[1]"
            ]
        },
        "slot-ghost": {
            name: "portfolio.slot-ghost.name",
            note: "portfolio.slot-ghost.note",
            description: [
                "portfolio.slot-ghost.description[0]", "portfolio.slot-ghost.description[1]"
            ],
            points: [
                "portfolio.slot-ghost.points[0]", "portfolio.slot-ghost.points[1]", "portfolio.slot-ghost.points[2]", "portfolio.slot-ghost.points[3]", "portfolio.slot-ghost.points[4]", "portfolio.slot-ghost.points[5]", "portfolio.slot-ghost.points[6]"
            ]
        },
        "official-website": {
            name: "portfolio.official-website.name",
            note: "portfolio.official-website.note",
            description: [
                "portfolio.official-website.description[0]", "portfolio.official-website.description[1]"
            ],
            points: [
                "portfolio.official-website.points[0]", "portfolio.official-website.points[1]", "portfolio.official-website.points[2]"
            ]
        },
        "mpz-utilities": {
            name: "portfolio.mpz-utilities.name",
            note: "portfolio.mpz-utilities.note",
            description: [
                "portfolio.mpz-utilities.description[0]", "portfolio.mpz-utilities.description[1]"
            ],
            points: [
                "portfolio.mpz-utilities.points[0]"
            ]
        },
        "mpz-i18n": {
            name: "portfolio.mpz-i18n.name",
            note: "portfolio.mpz-i18n.note",
            description: [
                "portfolio.mpz-i18n.description[0]"
            ],
            points: [
                "portfolio.mpz-i18n.points[0]"
            ]
        },
        "personal-resume-2021": {
            name: "portfolio.personal-resume-2021.name",
            note: "portfolio.personal-resume-2021.note",
            description: [
                "portfolio.personal-resume-2021.description[0]"
            ],
            points: [
                "portfolio.personal-resume-2021.points[0]"
            ]
        },
        "creator-card": {
            name: "portfolio.creator-card.name",
            note: "portfolio.creator-card.note",
            description: [
                "portfolio.creator-card.description[0]"
            ],
            points: [
                "portfolio.creator-card.points[0]"
            ]
        }
    }
}
