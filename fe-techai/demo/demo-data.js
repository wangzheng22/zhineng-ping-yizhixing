/* 演示数据 — 对齐截图：13个评分项新疆市及评审项匹配验证 */
(function (global) {
  function makeCards(subName) {
    return [
      {
        id: subName + '-c1',
        title: subName === '土石方工程' ? '土石方开挖' : subName + '专项方案',
        pass: true,
        sources: [
          {
            chapter: '分部分项工程量清单',
            code: '010101001001',
            feature: '挖一般土方；三类土；弃土运距5km内',
            text: '招标文件要求明确开挖方式、边坡支护及弃土运输组织，并与清单项目特征、综合单价组成口径一致。',
            page: 230
          }
        ],
        aiConclusion:
          '投标文件针对「' + subName + '」给出了较完整的工艺流程、机械配置与安全措施。开挖分层、边坡防护、弃土外运路径描述清晰，与招标清单项目特征及计量规则基本匹配，判定为符合。',
        originals: [
          {
            title: '4.1 开挖方法与机械配置',
            text: '本工程土石方开挖采用1.0m³挖掘机分层开挖，自卸汽车外运，开挖坡度按设计1:0.75控制；基坑周边设置截水沟及临边防护。',
            pages: ['3-4', '13-14']
          },
          {
            title: '4.2 弃土与运输组织',
            text: '弃土场选址经业主确认，运输路线避开高峰路段，出场设置洗车台及防抛洒措施。',
            pages: ['15']
          }
        ]
      },
      {
        id: subName + '-c2',
        title: subName === '土石方工程' ? '土方回填' : subName + '质量保证',
        pass: subName !== '混凝土及钢筋混凝土工程',
        sources: [
          {
            chapter: '技术标准和要求',
            code: '',
            feature: '',
            text: '回填应分层夯实，压实系数满足设计要求；原材料进场检验合格后方可使用。',
            page: 88
          }
        ],
        aiConclusion:
          subName === '混凝土及钢筋混凝土工程'
            ? '投标文件对混凝土配合比及养护措施有描述，但未明确与清单中C35结构柱项目特征的对应关系，存在口径不一致风险，判定为不符合。'
            : '投标文件已说明回填材料来源、分层厚度、压实标准及检测频率，与招标技术要求一致，判定为符合。',
        originals: [
          {
            title: '质量保证措施',
            text: '回填前清除积水杂物，每层虚铺厚度不大于300mm，采用振动压路机碾压，压实系数≥0.94，按规范取样检测。',
            pages: ['42', '43']
          }
        ]
      }
    ];
  }

  function makeSubs() {
    var names = [
      '土石方工程',
      '混凝土及钢筋混凝土工程',
      '钢筋工程',
      '砌筑工程',
      '门窗工程',
      '屋面工程',
      '防水工程',
      '装饰装修工程',
      '给排水工程',
      '拆除工程'
    ];
    // status icons: 1=pass, 0=fail — matches screenshot pattern
    var statusMap = [
      [1, 1],
      [0, 1, 1, 1],
      [1],
      [1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1],
      [1, 1],
      [0, 1],
      [1]
    ];
    return names.map(function (name, i) {
      return {
        id: 'sub-' + (i + 1),
        name: name,
        statuses: statusMap[i] || [1],
        cards: makeCards(name)
      };
    });
  }


  var CONSISTENCY_CARDS = [
    {
      id: 'sgfa',
      title: '施工方案与技术措施一致性',
      status: 'warn',
      summary: 'AI检测到施工方案中土石方开挖工艺与工程量清单计量口径存在2处不一致，建议复核机械配置与清单项对应关系。',
      items: [
        {
          id: 'sgfa-1',
          name: '土石方开挖',
          pass: true,
          refPoint: '招标文件要求土石方开挖应明确开挖方式、机械配置及与清单计量规则的对应关系，保证技术标与经济标口径一致。',
          aiDesc: '投标文件中土石方开挖方案已明确分层开挖、机械组合及弃土运输路径，并与清单土方项目特征描述基本一致。',
          response: '本工程土石方开挖采用挖掘机分层开挖，自卸汽车外运，开挖坡度按设计要求控制…',
          pages: [129, 11]
        },
        {
          id: 'sgfa-2',
          name: '基坑支护',
          pass: false,
          refPoint: '技术标应说明基坑支护形式，并与清单中支护相关项目、措施费对应。',
          aiDesc: '技术标描述采用放坡开挖，但经济标清单中列有钢板桩支护项目，二者不一致。',
          response: '基坑深度较浅，拟采用自然放坡，必要时辅以喷锚…',
          pages: [36]
        }
      ]
    },
    {
      id: 'zlgl',
      title: '质量管理体系一致性',
      status: 'ok',
      summary: '质量保证体系、检验批划分与清单主要分部分项对应关系清晰，未发现明显冲突。',
      items: [
        {
          id: 'zlgl-1',
          name: '质量保证体系',
          pass: true,
          refPoint: '应建立项目质量责任制，关键工序实行三检制，并与合同质量目标一致。',
          aiDesc: '质量保证体系描述完整，岗位职责清晰，与招标质量目标匹配。',
          response: '项目经理为工程质量第一责任人，实行自检、互检、专检三检制度…',
          pages: [88]
        }
      ]
    },
    {
      id: 'aqwm',
      title: '安全文明施工一致性',
      status: 'warn',
      summary: '安全文明措施总体完整，但临时用电方案与措施项目清单中部分费用项对应不足。',
      items: [
        {
          id: 'aqwm-1',
          name: '临时用电',
          pass: false,
          refPoint: '临时用电方案应与措施项目清单中的临时设施、安全文明施工费对应。',
          aiDesc: '技术标有临时用电专篇，但清单措施费中未见对应专项费用拆分说明。',
          response: '现场采用TN-S系统，三级配电两级保护…',
          pages: [102]
        },
        {
          id: 'aqwm-2',
          name: '围挡与警示',
          pass: true,
          refPoint: '施工围挡、警示标识应符合安全文明施工要求。',
          aiDesc: '围挡高度、材质及警示设置描述完整，与措施要求一致。',
          response: '沿红线设置2.5m封闭围挡，出入口设置洗车台及警示标志…',
          pages: [105]
        }
      ]
    }
  ];

  var factorDefs = [
    { id: 'gcgk', name: '工程概况及特点', score: 71 },
    { id: 'sgfa', name: '施工方案', score: 71 },
    { id: 'sgjd', name: '施工进度计划', score: 80, isMax: true },
    { id: 'sgbz', name: '施工平面布置', score: 54 },
    { id: 'ldl', name: '劳动力需用量计划', score: 75, isMax: true },
    { id: 'cl', name: '主要材料需用量计划', score: 33 },
    { id: 'jx', name: '主要机械需用量计划', score: 50 },
    { id: 'zl', name: '质量保证措施', score: 32 },
    { id: 'gq', name: '工期保证措施', score: 90 },
    { id: 'aq', name: '安全保证措施', score: 66 },
    { id: 'wm', name: '文明施工措施', score: 72 },
    { id: 'zn', name: '智慧工地', score: 50 },
    { id: 'bim', name: 'BIM技术应用', score: 90 }
  ];

  function makeFactors(scoreOffset) {
    scoreOffset = scoreOffset || 0;
    var list = factorDefs.map(function (f) {
      var score = Math.max(20, Math.min(100, f.score + scoreOffset));
      var subs = f.id === 'sgfa' ? makeSubs() : [
        {
          id: f.id + '-s1',
          name: f.name + '要点',
          statuses: [1, 1],
          cards: makeCards(f.name)
        }
      ];
      var refCount = f.id === 'sgfa' ? 31 : 12;
      var passCount = f.id === 'sgfa' ? 22 : 9;
      return {
        id: f.id,
        name: f.name,
        score: score,
        isMax: !!f.isMax,
        refCount: refCount,
        passCount: passCount,
        subs: subs,
        barType: 'default'
      };
    });
    list.unshift({
      id: 'consistency',
      name: '经济技术一致性',
      score: Math.max(20, Math.min(100, 74 + scoreOffset)),
      isMax: false,
      refCount: CONSISTENCY_CARDS.length,
      passCount: CONSISTENCY_CARDS.reduce(function (n, c) {
        return n + c.items.filter(function (it) { return it.pass; }).length;
      }, 0),
      subs: [],
      barType: 'consistency'
    });
    return list;
  }

  var bidders = [
    { id: 'b1', name: '中起建工集团有限公司', score: 71, offset: 0 },
    { id: 'b2', name: '四川三河恒生建筑工程有限公司', score: 69, offset: -2 },
    { id: 'b3', name: '新疆石龙基建工程有限公司', score: 73, offset: 2 },
    { id: 'b4', name: '中瑞能国际工程有限公司', score: 74, offset: 3 },
    { id: 'b5', name: '克孜勒苏柯尔克孜自治州第一建筑工程有限责任公司', score: 76, offset: 5 }
  ].map(function (b) {
    return {
      id: b.id,
      name: b.name,
      score: b.score,
      factors: makeFactors(b.offset)
    };
  });


  var PDF_FILES = [
    {
      value: 'tender',
      label: '黄州区档案馆新馆数字馆建设项目招标文件（B包数字档案馆）.pdf',
      group: 'tender',
      url: 'fe-techai/demo/pdf/huangzhou-tender.pdf',
      pages: {
        88: '第三章 技术标准和要求\n\n5.2 回填与压实\n回填应分层夯实，压实系数满足设计要求；原材料进场检验合格后方可使用。虚铺厚度不大于300mm，采用振动压路机碾压，压实系数≥0.94。\n\n5.3 检测与验收\n按规范要求取样检测，形成完整的质量记录。',
        230: '分部分项工程量清单\n\n项目编码：010101001001\n项目名称：挖一般土方\n项目特征：三类土；弃土运距5km内\n\n招标文件要求明确开挖方式、边坡支护及弃土运输组织，并与清单项目特征、综合单价组成口径一致。投标人应在技术标中响应开挖分层、机械配置、临边防护及弃土外运路径。',
        231: '清单说明（续）\n\n计量规则按设计图示尺寸以体积计算。工作内容包括：土方开挖、装车、运输、卸除、平整等。',
        12: '第一章 招标公告\n\n工程名称：伊犁州某市政道路改扩建工程\n建设地点：新疆维吾尔自治区伊犁哈萨克自治州\n\n本招标文件包括投标须知、合同条款、技术标准和要求、工程量清单及图纸等。'
      }
    }
  ];

  global.DEMO = {
    projectName: '13个评分项新疆市及评审项匹配验证：伊犁州某市政道路改扩建工程',
    aiPointTotal: 218,
    bidders: bidders,
    consistencyCards: CONSISTENCY_CARDS,
    pdfFiles: PDF_FILES
  };
})(window);
