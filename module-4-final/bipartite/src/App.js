import React, { useEffect, useRef } from "react"
import "./App.css"
const data1 = [
    {
        cardId: "190613000006316",
        userList: [
            "userid/160606000000501",
            "userid/160609000000501",
            "userid/160610000004501",
            "userid/160614000000501",
            "userid/160615000000002",
            "userid/160624000000002",
            "userid/170202000004182",
            "userid/170207000002075",
            "userid/170410000002274",
            "userid/170623000000222",
            "userid/170822000002016",
            "userid/170911000000099",
            "userid/171003000002068",
            "userid/171107000000002",
            "userid/180201000007274",
            "userid/180731000006243",
            "userid/180827000012276",
            "userid/180829000010014",
            "userid/180907000000563",
            "userid/180921000000560",
            "userid/181025000008203",
            "userid/181026000006196",
            "userid/181105000002416",
            "userid/181108000006385",
            "userid/181115000007523",
            "userid/181231000007182",
            "userid/190104000000220",
            "userid/190108000006024",
            "userid/190124000012206",
            "userid/190227000017796",
            "userid/190306000000349",
            "userid/190306000000421",
            "userid/190307000002430",
            "userid/190307000002982",
            "userid/190309000002501",
            "userid/190309000003027",
            "userid/190312000012042",
            "userid/190313000000511",
            "userid/190319000002578",
            "userid/190325000000964",
            "userid/190326000001013",
            "userid/190416000000821",
            "userid/190416000003139",
            "userid/190423000000695",
            "userid/190424000000465",
            "userid/190428000003456",
            "userid/190524000003049",
            "userid/190531000001454",
            "userid/190626000001097",
            "userid/190807000007320",
            "userid/190828000000928",
            "userid/190913732000739",
            "userid/190913933000774",
            "userid/190923509008109",
            "userid/190925087000505",
            "userid/190925557002574",
            "userid/191002530006062",
            "userid/191002684004827",
            "userid/191004543004733",
            "userid/191017842002944",
            "userid/191022249003478",
            "userid/191108466000598",
            "userid/191112077000684",
            "userid/191112083001179",
            "userid/191113435008112",
            "userid/191113811003407",
            "userid/191114625000648",
            "userid/191118481003359",
            "userid/191119063003221",
            "userid/191119918003160",
            "userid/191120208000799",
            "userid/191120379003324",
            "userid/191121647000584",
            "userid/191121777002231",
            "userid/191123789003936",
            "userid/191125460001623",
            "userid/191126111000936",
            "userid/191127267000771",
            "userid/191128202000724",
            "userid/191128502000809",
            "userid/191203842001357",
            "userid/191204254002571",
            "userid/191227000024188",
            "userid/200118000027039",
            "userid/200118000030625",
            "userid/200120000012919",
            "userid/200120000021555",
            "userid/200120000022320",
            "userid/200120000022840",
            "userid/200120000024112",
            "userid/200120000030185",
            "userid/200121000023767",
            "userid/200125000698432",
            "userid/200127000041295",
            "userid/200207000021689",
            "userid/200331000007144",
            "userid/200403000010299",
            "userid/200413000021177",
            "userid/200413000024468",
            "userid/200507000015765",
            "userid/200701000014840",
            "userid/200707000014769",
            "userid/200723000006212",
            "userid/200729000007572",
            "userid/200805000281108",
            "userid/200915000010160",
            "userid/200915000010205",
            "userid/200915000016862",
            "userid/200915000017139",
            "userid/200915000019258",
            "userid/200915000038225",
            "userid/200915000038255",
        ],
        userListLength: 112,
    },
    {
        cardId: "190612001023515",
        userList: [
            "userid/160609000000501",
            "userid/160614000000501",
            "userid/160615000000002",
            "userid/160620000000002",
            "userid/170110000000111",
            "userid/170111000002272",
            "userid/170202000004182",
            "userid/170207000002075",
            "userid/170911000000099",
            "userid/171003000002068",
            "userid/180201000007274",
            "userid/180620000000859",
            "userid/180627000001456",
            "userid/180822000000480",
            "userid/180827000012276",
            "userid/180829000010014",
            "userid/180905000002760",
            "userid/180912000009107",
            "userid/180914000002656",
            "userid/180921000000560",
            "userid/181002000000709",
            "userid/181025000008203",
            "userid/181026000006196",
            "userid/181105000002416",
            "userid/181105000006792",
            "userid/181115000007523",
            "userid/181231000007182",
            "userid/190107000004500",
            "userid/190108000006024",
            "userid/190227000017796",
            "userid/190306000003245",
            "userid/190326000001013",
            "userid/190402000002923",
            "userid/190422000000243",
            "userid/190428000003456",
            "userid/190512000001863",
            "userid/190531000001454",
            "userid/190813000003616",
            "userid/191004543004733",
            "userid/191101742001625",
            "userid/191118481003359",
            "userid/191126111000936",
            "userid/191202383000430",
            "userid/200118000027039",
            "userid/200125000698432",
            "userid/200331000007144",
            "userid/200704000032229",
            "userid/200707000014769",
            "userid/200720000029450",
        ],
        userListLength: 49,
    },
    {
        cardId: "190612000010737",
        userList: [
            "userid/160609000000501",
            "userid/160614000000501",
            "userid/160615000000002",
            "userid/160922000014043",
            "userid/170111000002272",
            "userid/170207000002075",
            "userid/170410000002274",
            "userid/170623000000222",
            "userid/170911000000099",
            "userid/171003000002068",
            "userid/180730000001025",
            "userid/180730000002314",
            "userid/180827000012276",
            "userid/180829000010014",
            "userid/181003000008401",
            "userid/181026000006196",
            "userid/181108000006385",
            "userid/181231000007182",
            "userid/190108000006024",
            "userid/190118000001979",
            "userid/190227000017796",
            "userid/190307000000896",
            "userid/190318000002670",
            "userid/190325000000964",
            "userid/190404000001892",
            "userid/190411000014258",
            "userid/190428000003456",
            "userid/190531000001454",
            "userid/190626000001097",
            "userid/190627000003319",
            "userid/190724000002634",
            "userid/190807000007320",
            "userid/190815000003356",
            "userid/191112083001179",
            "userid/191118481003359",
            "userid/200118000030625",
            "userid/200122000023069",
            "userid/200123000035007",
            "userid/200709000026276",
        ],
        userListLength: 39,
    },
    {
        cardId: "190612000843364",
        userList: [
            "userid/160606000000501",
            "userid/160609000000501",
            "userid/160614000000501",
            "userid/160615000000002",
            "userid/160624000000002",
            "userid/170207000002075",
            "userid/170410000002274",
            "userid/170623000000222",
            "userid/170706000010158",
            "userid/170802000004821",
            "userid/180827000012276",
            "userid/180827000014126",
            "userid/181025000008203",
            "userid/181026000006196",
            "userid/181105000002416",
            "userid/181115000007523",
            "userid/190108000006024",
            "userid/190306000003245",
            "userid/190402000002894",
            "userid/190410000020312",
            "userid/190411000002073",
            "userid/190412000006788",
            "userid/190428000003456",
            "userid/190512000001874",
            "userid/190726000002640",
            "userid/190801000003764",
            "userid/190807000007320",
            "userid/190818000004076",
            "userid/190826000003175",
            "userid/190903000002565",
            "userid/190913732000739",
            "userid/190913933000774",
            "userid/190925087000505",
            "userid/190925557002574",
            "userid/191002684004827",
            "userid/191128202000724",
            "userid/191202383000430",
            "userid/200121000023767",
        ],
        userListLength: 38,
    },
    {
        cardId: "190621000547602",
        userList: [
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/170111000002272",
            "userid/170410000002274",
            "userid/170623000000222",
            "userid/171003000002068",
            "userid/180128000003536",
            "userid/180130000003363",
            "userid/180326000003328",
            "userid/180627000001456",
            "userid/180827000014126",
            "userid/180912000009107",
            "userid/181025000008203",
            "userid/181026000006196",
            "userid/190124000012206",
            "userid/190329000007262",
            "userid/190428000003456",
            "userid/190726000002640",
            "userid/190807000007320",
            "userid/200120000030185",
            "userid/200704000032229",
            "userid/200723000006212",
            "userid/200729000007572",
            "userid/200731000011260",
        ],
        userListLength: 24,
    },
    {
        cardId: "191009000009323",
        userList: [
            "userid/181025000008203",
            "userid/190124000012206",
            "userid/190913732000739",
            "userid/190919489001404",
            "userid/191002684004827",
            "userid/191108466000598",
            "userid/191113297001522",
            "userid/191118481003359",
            "userid/191121625003159",
            "userid/191123267001951",
            "userid/191125310001755",
            "userid/191126111000936",
            "userid/191127267000771",
            "userid/191128202000724",
            "userid/191203606001485",
            "userid/200117000015211",
            "userid/200117000021655",
            "userid/200117000024697",
            "userid/200120000030185",
            "userid/200731000011260",
            "userid/200915000008280",
        ],
        userListLength: 21,
    },
    {
        cardId: "190613000072653",
        userList: [
            "userid/170111000002272",
            "userid/180620000000859",
            "userid/180627000001456",
            "userid/180905000002760",
            "userid/180913000006076",
            "userid/180914000002656",
            "userid/181026000006196",
            "userid/181105000006792",
            "userid/190107000004500",
            "userid/190215000013404",
            "userid/190402000002894",
            "userid/190402000002923",
            "userid/190403000002677",
            "userid/190423000000971",
            "userid/190708000002944",
            "userid/190710000002465",
            "userid/190813000003616",
        ],
        userListLength: 17,
    },
    {
        cardId: "190612000010799",
        userList: [
            "userid/160609000000501",
            "userid/160614000000501",
            "userid/160615000000002",
            "userid/170207000002075",
            "userid/170410000002274",
            "userid/171003000002068",
            "userid/180829000010014",
            "userid/181025000008203",
            "userid/181026000006196",
            "userid/190108000006024",
            "userid/190227000017796",
            "userid/190325000000964",
            "userid/190428000003456",
            "userid/190626000001097",
            "userid/191128502000809",
        ],
        userListLength: 15,
    },
    {
        cardId: "190612000780703",
        userList: [
            "userid/180120000000117",
            "userid/190807000007320",
            "userid/190818000004076",
            "userid/190925087000505",
            "userid/191004543004733",
            "userid/191022249003478",
            "userid/191022455008515",
            "userid/191113167003587",
            "userid/191113297001522",
            "userid/191113349001510",
            "userid/191113811003407",
            "userid/200120000022320",
        ],
        userListLength: 12,
    },
    {
        cardId: "200120000006364",
        userList: [
            "userid/160609000000501",
            "userid/161216000000057",
            "userid/171005000002531",
            "userid/180201000007274",
            "userid/180731000006243",
            "userid/180912000009107",
            "userid/181231000007182",
            "userid/200118000027039",
            "userid/200128000017640",
            "userid/200704000032229",
            "userid/200707000014769",
        ],
        userListLength: 11,
    },
    {
        cardId: "190621000617443",
        userList: [
            "userid/160515000010001",
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/181025000008203",
            "userid/190108000006024",
            "userid/190124000012206",
            "userid/200117000024697",
            "userid/200118000027039",
            "userid/200331000007144",
            "userid/200915000008280",
            "userid/200928000015634",
        ],
        userListLength: 11,
    },
    {
        cardId: "190624000013990",
        userList: [
            "userid/160609000000501",
            "userid/181026000006196",
            "userid/190108000006024",
            "userid/190807000007320",
            "userid/190923509008109",
            "userid/191004543004733",
            "userid/191125310001755",
            "userid/191125671003575",
            "userid/200118000027039",
            "userid/200723000006212",
            "userid/200807000104028",
        ],
        userListLength: 11,
    },
    {
        cardId: "191205000006882",
        userList: [
            "userid/160609000000501",
            "userid/170207000002075",
            "userid/180730000002314",
            "userid/180802000001309",
            "userid/180912000009107",
            "userid/191004543004733",
            "userid/200118000027039",
            "userid/200720000029450",
            "userid/200723000006212",
        ],
        userListLength: 9,
    },
    {
        cardId: "190624000015496",
        userList: [
            "userid/160609000000501",
            "userid/180128000003536",
            "userid/180201000007274",
            "userid/180422000003324",
            "userid/180610000000361",
            "userid/190225000019013",
            "userid/200331000007144",
            "userid/200704000032229",
            "userid/200723000006212",
        ],
        userListLength: 9,
    },
    {
        cardId: "191219000008731",
        userList: [
            "userid/160609000000501",
            "userid/190807000007320",
            "userid/190925087000505",
            "userid/191004543004733",
            "userid/200118000027039",
            "userid/200122000021616",
            "userid/200123000035007",
            "userid/200125000698432",
            "userid/200709000026276",
        ],
        userListLength: 9,
    },
    {
        cardId: "190624000013920",
        userList: [
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/170207000002075",
            "userid/170623000000222",
            "userid/180128000003536",
            "userid/180201000007274",
            "userid/180610000000361",
            "userid/200704000032229",
            "userid/200805000281108",
        ],
        userListLength: 9,
    },
    {
        cardId: "200526000006826",
        userList: [
            "userid/160609000000501",
            "userid/171005000002531",
            "userid/180128000003536",
            "userid/180628000002040",
            "userid/181231000007182",
            "userid/190225000019013",
            "userid/200118000027039",
            "userid/200125000698432",
            "userid/200331000007144",
        ],
        userListLength: 9,
    },
    {
        cardId: "190612000588395",
        userList: [
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/170802000004821",
            "userid/171003000002068",
            "userid/171005000002531",
            "userid/180912000009107",
            "userid/190108000006024",
            "userid/200805000281108",
        ],
        userListLength: 8,
    },
    {
        cardId: "190613000115725",
        userList: [
            "userid/160606000000501",
            "userid/160609000000501",
            "userid/170207000002075",
            "userid/181026000006196",
            "userid/190531000001454",
            "userid/191004543004733",
            "userid/191101742001625",
            "userid/191121622003617",
        ],
        userListLength: 8,
    },
    {
        cardId: "190612000588390",
        userList: [
            "userid/160609000000501",
            "userid/180829000011088",
            "userid/180912000009107",
            "userid/200118000027039",
            "userid/200704000032229",
            "userid/200723000006212",
            "userid/200805000281108",
        ],
        userListLength: 7,
    },
    {
        cardId: "200613000009661",
        userList: [
            "userid/160515000010001",
            "userid/160922000004058",
            "userid/170410000002274",
            "userid/190428000003456",
            "userid/191217046004388",
            "userid/191219352024058",
        ],
        userListLength: 6,
    },
    {
        cardId: "190613000004540",
        userList: [
            "userid/160609000000501",
            "userid/161216000000057",
            "userid/190228000003378",
            "userid/191004543004733",
            "userid/200118000027039",
            "userid/200128000017640",
        ],
        userListLength: 6,
    },
    {
        cardId: "190613000087481",
        userList: [
            "userid/160609000000501",
            "userid/160614000000501",
            "userid/170111000002272",
            "userid/170623000000222",
            "userid/181026000006196",
            "userid/190531000001454",
        ],
        userListLength: 6,
    },
    {
        cardId: "200929000010618",
        userList: [
            "userid/160609000000501",
            "userid/171005000002531",
            "userid/180705000002943",
            "userid/180730000002314",
            "userid/200118000027039",
        ],
        userListLength: 5,
    },
    {
        cardId: "191227000002972",
        userList: [
            "userid/160609000000501",
            "userid/180120000000117",
            "userid/191004543004733",
            "userid/200701000014840",
            "userid/200723000006212",
        ],
        userListLength: 5,
    },
    {
        cardId: "190624000011771",
        userList: [
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/171003000002068",
            "userid/190108000006024",
            "userid/190428000003456",
        ],
        userListLength: 5,
    },
    {
        cardId: "190613000074690",
        userList: [
            "userid/160609000000501",
            "userid/181231000007182",
            "userid/190129000003888",
            "userid/190130000000835",
            "userid/200118000027039",
        ],
        userListLength: 5,
    },
    {
        cardId: "190613000048851",
        userList: [
            "userid/170410000002274",
            "userid/170802000004821",
            "userid/171003000002068",
            "userid/180215000003219",
            "userid/190329000007262",
        ],
        userListLength: 5,
    },
    {
        cardId: "190613000021633",
        userList: [
            "userid/160606000000501",
            "userid/160614000000501",
            "userid/160624000000002",
            "userid/181025000008203",
            "userid/181026000006196",
        ],
        userListLength: 5,
    },
    {
        cardId: "200529000000889",
        userList: [
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/171003000002068",
            "userid/180912000009107",
        ],
        userListLength: 4,
    },
    {
        cardId: "190509000054755",
        userList: [
            "userid/160614000000501",
            "userid/160615000000002",
            "userid/181026000006196",
            "userid/191004543004733",
        ],
        userListLength: 4,
    },
    {
        cardId: "200723000000216",
        userList: [
            "userid/160609000000501",
            "userid/180912000009107",
            "userid/200125000698432",
            "userid/200704000032229",
        ],
        userListLength: 4,
    },
    {
        cardId: "200629000004150",
        userList: [
            "userid/180717000000569",
            "userid/190925087000505",
            "userid/191004543004733",
            "userid/191022455008515",
        ],
        userListLength: 4,
    },
    {
        cardId: "190612000589344",
        userList: [
            "userid/160609000000501",
            "userid/171003000002068",
            "userid/180730000001025",
            "userid/190818000004076",
        ],
        userListLength: 4,
    },
    {
        cardId: "190621000600899",
        userList: [
            "userid/160609000000501",
            "userid/160615000000002",
            "userid/190807000007320",
            "userid/191004543004733",
        ],
        userListLength: 4,
    },
    {
        cardId: "190621000458278",
        userList: [
            "userid/160609000000501",
            "userid/180730000002314",
            "userid/181026000006196",
            "userid/200331000007144",
        ],
        userListLength: 4,
    },
    {
        cardId: "190613000005425",
        userList: [
            "userid/160609000000501",
            "userid/170111000002272",
            "userid/170623000000222",
            "userid/200118000027039",
        ],
        userListLength: 4,
    },
    {
        cardId: "190613000016538",
        userList: [
            "userid/160609000000501",
            "userid/170623000000222",
            "userid/190531000001454",
            "userid/190807000007320",
        ],
        userListLength: 4,
    },
    {
        cardId: "190624000014598",
        userList: [
            "userid/160609000000501",
            "userid/171005000002531",
            "userid/180610000000361",
            "userid/190227000017796",
        ],
        userListLength: 4,
    },
    {
        cardId: "190624000014722",
        userList: [
            "userid/160609000000501",
            "userid/171005000002531",
            "userid/180912000009107",
        ],
        userListLength: 3,
    },
    {
        cardId: "200726000004937",
        userList: [
            "userid/180201000007274",
            "userid/200331000007144",
            "userid/200805000281108",
        ],
        userListLength: 3,
    },
    {
        cardId: "190612000589334",
        userList: [
            "userid/160609000000501",
            "userid/181122000002974",
            "userid/190130000000835",
        ],
        userListLength: 3,
    },
    {
        cardId: "190621000339623",
        userList: [
            "userid/160609000000501",
            "userid/180912000009107",
            "userid/200118000027039",
        ],
        userListLength: 3,
    },
    {
        cardId: "191007000010224",
        userList: ["userid/160609000000501", "userid/180806000006359"],
        userListLength: 2,
    },
    {
        cardId: "190619000014749",
        userList: ["userid/171003000002068", "userid/200805000281108"],
        userListLength: 2,
    },
    {
        cardId: "190704000006887",
        userList: ["userid/180610000000361", "userid/191009703002797"],
        userListLength: 2,
    },
    {
        cardId: "190613000149613",
        userList: ["userid/160609000000501", "userid/180730000002314"],
        userListLength: 2,
    },
    {
        cardId: "190613000081073",
        userList: ["userid/160609000000501", "userid/190129000003888"],
        userListLength: 2,
    },
    {
        cardId: "190509000055632",
        userList: ["userid/181026000006196"],
        userListLength: 1,
    },
    {
        cardId: "200814000004397",
        userList: ["userid/160609000000501"],
        userListLength: 1,
    },
    {
        cardId: "190624000015067",
        userList: ["userid/180128000003536"],
        userListLength: 1,
    },
    {
        cardId: "200724000010366",
        userList: ["userid/180705000002943"],
        userListLength: 1,
    },
    {
        cardId: "200512000008380",
        userList: ["userid/200118000027039"],
        userListLength: 1,
    },
    {
        cardId: "200929000008269",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "201001000019572",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "190704000007847",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "191214000014871",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200529000002211",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200922000009884",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200915000005222",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200911000015343",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200907000013401",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200903000005389",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "191227000008301",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200116000009535",
        userList: [],
        userListLength: 0,
    },
    {
        cardId: "200529000002204",
        userList: [],
        userListLength: 0,
    },
]
const data = [
    ["A", "X", 1],
    ["A", "Y", 1],
    ["B", "X", 1],
    ["B", "Y", 1],
    ["C", "X", 1],
    ["C", "Y", 1],
]

export default function App() {
    const links_ = data1
        .map((x) => {
            return x.userList.map((d) => ({ source: x.cardId, target: d }))
        })
        .flat()
        .map((x) => [x.source, x.target, 1])

    const sortNow = () => {
        const sortOrder = data1
            .sort((a, b) => a.userListLength - b.userListLength)
            .map((x) => x.cardId)
        return function (a, b) {
            return window.d3.descending(
                sortOrder.indexOf(a),
                sortOrder.indexOf(b)
            )
        }
    }

    useEffect(() => {
        const bP = window.viz
            .biPartite()
            .width(1000)
            .height(2000)
            .sortPrimary(sortNow())
            .data(links_)
        const bPg = window.d3.select("g").call(bP)

        bPg.selectAll(".viz-biPartite-mainBar")
            .filter((d) => d.part === "secondary")
            .append("text")
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", "10px")
            .attr("x", 36)
            .text((d) => d.key)

        bPg.selectAll(".viz-biPartite-mainBar")
            .filter((d) => d.part === "primary")
            .append("text")
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr("font-size", "10px")
            .attr("x", -36)
            .text((d) => d.key)

        bPg.selectAll(".viz-biPartite-mainBar")
            .append("text")
            .attr("class", "perc")
            .text(function (d) {
                return window.d3.format(".0%")(d.percent)
            })

        bPg.selectAll(".viz-biPartite-mainBar")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)

        function mouseover(d) {
            bP.mouseover(d)

            bPg.selectAll(".viz-biPartite-mainBar")
                .select(".perc")
                .text(function (d) {
                    return window.d3.format(".0%")(d.percent)
                })
            if (d.part === "primary") {
                bPg.selectAll(".viz-biPartite-mainBar")
                    .filter((d) => d.part === "secondary" && d.percent === 0)
                    .style("visibility", "hidden")
            } else {
                bPg.selectAll(".viz-biPartite-mainBar")
                    .filter((d) => d.part === "primary" && d.percent === 0)
                    .style("visibility", "hidden")
            }
        }

        function mouseout(d) {
            bP.mouseout(d)

            bPg.selectAll(".viz-biPartite-mainBar")
                .select(".perc")
                .text(function (d) {
                    return window.d3.format(".0%")(d.percent)
                })

            bPg.selectAll(".viz-biPartite-mainBar").style(
                "visibility",
                "visible"
            )
        }
    }, [])
    return (
        <div>
            <svg style={{ width: 3000, height: 5000 }}>
                <g transform='translate(250, 50)'></g>
            </svg>
        </div>
    )
}
