const POEMS = [
    {
    'type': 'classical',
    'title': '静夜思',
    'dynasty': '唐',
    'author': '李白',
    'content': '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。',
    'highlight': '举头望明月，低头思故乡'
    },,
    {
    'type': 'classical',
    'title': '相思',
    'dynasty': '唐',
    'author': '王维',
    'content': '红豆生南国，春来发几枝。\n愿君多采撷，此物最相思。',
    'highlight': '愿君多采撷，此物最相思'
    },,
    {
    'type': 'classical',
    'title': '春晓',
    'dynasty': '唐',
    'author': '孟浩然',
    'content': '春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。',
    'highlight': '春眠不觉晓，处处闻啼鸟'
    },,
    {
    'type': 'classical',
    'title': '山中',
    'dynasty': '唐',
    'author': '王维',
    'content': '荆溪白石出，天寒红叶稀。\n山路元无雨，空翠湿人衣。',
    'highlight': '山路元无雨，空翠湿人衣'
    },,
    {
    'type': 'classical',
    'title': '竹里馆',
    'dynasty': '唐',
    'author': '王维',
    'content': '独坐幽篁里，弹琴复长啸。\n深林人不知，明月来相照。',
    'highlight': '深林人不知，明月来相照'
    },,
    {
    'type': 'classical',
    'title': '杂诗',
    'dynasty': '唐',
    'author': '王维',
    'content': '君自故乡来，应知故乡事。\n来日绮窗前，寒梅著花未？',
    'highlight': '来日绮窗前，寒梅著花未'
    },,
    {
    'type': 'classical',
    'title': '鹿柴',
    'dynasty': '唐',
    'author': '王维',
    'content': '空山不见人，但闻人语响。\n返景入深林，复照青苔上。',
    'highlight': '空山不见人，但闻人语响'
    },,
    {
    'type': 'classical',
    'title': '鸟鸣涧',
    'dynasty': '唐',
    'author': '王维',
    'content': '人闲桂花落，夜静春山空。\n月出惊山鸟，时鸣春涧中。',
    'highlight': '人闲桂花落，夜静春山空'
    },,
    {
    'type': 'classical',
    'title': '送别',
    'dynasty': '唐',
    'author': '王维',
    'content': '山中相送罢，日暮掩柴扉。\n春草年年绿，王孙归不归？',
    'highlight': '春草年年绿，王孙归不归'
    },,
    {
    'type': 'classical',
    'title': '渡汉江',
    'dynasty': '唐',
    'author': '宋之问',
    'content': '岭外音书断，经冬复历春。\n近乡情更怯，不敢问来人。',
    'highlight': '近乡情更怯，不敢问来人'
    },,
    {
    'type': 'classical',
    'title': '宿建德江',
    'dynasty': '唐',
    'author': '孟浩然',
    'content': '移舟泊烟渚，日暮客愁新。\n野旷天低树，江清月近人。',
    'highlight': '野旷天低树，江清月近人'
    },,
    {
    'type': 'classical',
    'title': '闺怨',
    'dynasty': '唐',
    'author': '王昌龄',
    'content': '闺中少妇不知愁，春日凝妆上翠楼。\n忽见陌头杨柳色，悔教夫婿觅封侯。',
    'highlight': '忽见陌头杨柳色，悔教夫婿觅封侯'
    },,
    {
    'type': 'classical',
    'title': '出塞',
    'dynasty': '唐',
    'author': '王昌龄',
    'content': '秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。',
    'highlight': '但使龙城飞将在，不教胡马度阴山'
    },,
    {
    'type': 'classical',
    'title': '从军行',
    'dynasty': '唐',
    'author': '王昌龄',
    'content': '青海长云暗雪山，孤城遥望玉门关。\n黄沙百战穿金甲，不破楼兰终不还。',
    'highlight': '黄沙百战穿金甲，不破楼兰终不还'
    },,
    {
    'type': 'classical',
    'title': '芙蓉楼送辛渐',
    'dynasty': '唐',
    'author': '王昌龄',
    'content': '寒雨连江夜入吴，平明送客楚山孤。\n洛阳亲友如相问，一片冰心在玉壶。',
    'highlight': '一片冰心在玉壶'
    },,
    {
    'type': 'classical',
    'title': '送元二使安西',
    'dynasty': '唐',
    'author': '王维',
    'content': '渭城朝雨浥轻尘，客舍青青柳色新。\n劝君更尽一杯酒，西出阳关无故人。',
    'highlight': '劝君更尽一杯酒，西出阳关无故人'
    },,
    {
    'type': 'classical',
    'title': '九月九日忆山东兄弟',
    'dynasty': '唐',
    'author': '王维',
    'content': '独在异乡为异客，每逢佳节倍思亲。\n遥知兄弟登高处，遍插茱萸少一人。',
    'highlight': '独在异乡为异客，每逢佳节倍思亲'
    },,
    {
    'type': 'classical',
    'title': '使至塞上',
    'dynasty': '唐',
    'author': '王维',
    'content': '单车欲问边，属国过居延。\n征蓬出汉塞，归雁入胡天。\n大漠孤烟直，长河落日圆。',
    'highlight': '大漠孤烟直，长河落日圆'
    },,
    {
    'type': 'classical',
    'title': '山居秋暝',
    'dynasty': '唐',
    'author': '王维',
    'content': '空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。',
    'highlight': '明月松间照，清泉石上流'
    },,
    {
    'type': 'classical',
    'title': '终南别业',
    'dynasty': '唐',
    'author': '王维',
    'content': '中岁颇好道，晚家南山陲。\n兴来每独往，胜事空自知。\n行到水穷处，坐看云起时。',
    'highlight': '行到水穷处，坐看云起时'
    },,
    {
    'type': 'classical',
    'title': '登鹳雀楼',
    'dynasty': '唐',
    'author': '王之涣',
    'content': '白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。',
    'highlight': '欲穷千里目，更上一层楼'
    },,
    {
    'type': 'classical',
    'title': '凉州词',
    'dynasty': '唐',
    'author': '王翰',
    'content': '葡萄美酒夜光杯，欲饮琵琶马上催。\n醉卧沙场君莫笑，古来征战几人回。',
    'highlight': '醉卧沙场君莫笑，古来征战几人回'
    },,
    {
    'type': 'classical',
    'title': '黄鹤楼送孟浩然之广陵',
    'dynasty': '唐',
    'author': '李白',
    'content': '故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧空尽，唯见长江天际流。',
    'highlight': '烟花三月下扬州'
    },,
    {
    'type': 'classical',
    'title': '早发白帝城',
    'dynasty': '唐',
    'author': '李白',
    'content': '朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。',
    'highlight': '轻舟已过万重山'
    },,
    {
    'type': 'classical',
    'title': '望庐山瀑布',
    'dynasty': '唐',
    'author': '李白',
    'content': '日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。',
    'highlight': '飞流直下三千尺，疑是银河落九天'
    },,
    {
    'type': 'classical',
    'title': '望天门山',
    'dynasty': '唐',
    'author': '李白',
    'content': '天门中断楚江开，碧水东流至此回。\n两岸青山相对出，孤帆一片日边来。',
    'highlight': '两岸青山相对出，孤帆一片日边来'
    },,
    {
    'type': 'classical',
    'title': '渡荆门送别',
    'dynasty': '唐',
    'author': '李白',
    'content': '渡远荆门外，来从楚国游。\n山随平野尽，江入大荒流。',
    'highlight': '山随平野尽，江入大荒流'
    },,
    {
    'type': 'classical',
    'title': '送友人',
    'dynasty': '唐',
    'author': '李白',
    'content': '青山横北郭，白水绕东城。\n此地一为别，孤蓬万里征。\n浮云游子意，落日故人情。',
    'highlight': '浮云游子意，落日故人情'
    },,
    {
    'type': 'classical',
    'title': '月下独酌',
    'dynasty': '唐',
    'author': '李白',
    'content': '花间一壶酒，独酌无相亲。\n举杯邀明月，对影成三人。',
    'highlight': '举杯邀明月，对影成三人'
    },,
    {
    'type': 'classical',
    'title': '长干行',
    'dynasty': '唐',
    'author': '李白',
    'content': '妾发初覆额，折花门前剧。\n郎骑竹马来，绕床弄青梅。',
    'highlight': '郎骑竹马来，绕床弄青梅'
    },,
    {
    'type': 'classical',
    'title': '玉阶怨',
    'dynasty': '唐',
    'author': '李白',
    'content': '玉阶生白露，夜久侵罗袜。\n却下水晶帘，玲珑望秋月。',
    'highlight': '却下水晶帘，玲珑望秋月'
    },,
    {
    'type': 'classical',
    'title': '子夜吴歌·秋歌',
    'dynasty': '唐',
    'author': '李白',
    'content': '长安一片月，万户捣衣声。\n秋风吹不尽，总是玉关情。',
    'highlight': '长安一片月，万户捣衣声'
    },,
    {
    'type': 'classical',
    'title': '峨眉山月歌',
    'dynasty': '唐',
    'author': '李白',
    'content': '峨眉山月半轮秋，影入平羌江水流。\n夜发清溪向三峡，思君不见下渝州。',
    'highlight': '峨眉山月半轮秋'
    },,
    {
    'type': 'classical',
    'title': '金陵酒肆留别',
    'dynasty': '唐',
    'author': '李白',
    'content': '风吹柳花满店香，吴姬压酒唤客尝。\n请君试问东流水，别意与之谁短长？',
    'highlight': '请君试问东流水，别意与之谁短长'
    },,
    {
    'type': 'classical',
    'title': '宣州谢朓楼饯别校书叔云',
    'dynasty': '唐',
    'author': '李白',
    'content': '抽刀断水水更流，举杯销愁愁更愁。\n人生在世不称意，明朝散发弄扁舟。',
    'highlight': '抽刀断水水更流，举杯销愁愁更愁'
    },,
    {
    'type': 'classical',
    'title': '将进酒',
    'dynasty': '唐',
    'author': '李白',
    'content': '天生我材必有用，千金散尽还复来。',
    'highlight': '天生我材必有用，千金散尽还复来'
    },,
    {
    'type': 'classical',
    'title': '行路难',
    'dynasty': '唐',
    'author': '李白',
    'content': '长风破浪会有时，直挂云帆济沧海。',
    'highlight': '长风破浪会有时，直挂云帆济沧海'
    },,
    {
    'type': 'classical',
    'title': '蜀道难',
    'dynasty': '唐',
    'author': '李白',
    'content': '蜀道之难，难于上青天！',
    'highlight': '蜀道之难，难于上青天'
    },,
    {
    'type': 'classical',
    'title': '望岳',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '会当凌绝顶，一览众山小。',
    'highlight': '会当凌绝顶，一览众山小'
    },,
    {
    'type': 'classical',
    'title': '春望',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。',
    'highlight': '烽火连三月，家书抵万金'
    },,
    {
    'type': 'classical',
    'title': '蜀相',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '丞相祠堂何处寻？锦官城外柏森森。\n三顾频烦天下计，两朝开济老臣心。\n出师未捷身先死，长使英雄泪满襟。',
    'highlight': '出师未捷身先死，长使英雄泪满襟'
    },,
    {
    'type': 'classical',
    'title': '春夜喜雨',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '好雨知时节，当春乃发生。\n随风潜入夜，润物细无声。',
    'highlight': '随风潜入夜，润物细无声'
    },,
    {
    'type': 'classical',
    'title': '绝句',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '两个黄鹂鸣翠柳，一行白鹭上青天。\n窗含西岭千秋雪，门泊东吴万里船。',
    'highlight': '两个黄鹂鸣翠柳，一行白鹭上青天'
    },,
    {
    'type': 'classical',
    'title': '江畔独步寻花',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '黄四娘家花满蹊，千朵万朵压枝低。\n留连戏蝶时时舞，自在娇莺恰恰啼。',
    'highlight': '黄四娘家花满蹊，千朵万朵压枝低'
    },,
    {
    'type': 'classical',
    'title': '江南逢李龟年',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '岐王宅里寻常见，崔九堂前几度闻。\n正是江南好风景，落花时节又逢君。',
    'highlight': '正是江南好风景，落花时节又逢君'
    },,
    {
    'type': 'classical',
    'title': '旅夜书怀',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '星垂平野阔，月涌大江流。\n飘飘何所似，天地一沙鸥。',
    'highlight': '星垂平野阔，月涌大江流'
    },,
    {
    'type': 'classical',
    'title': '登岳阳楼',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '吴楚东南坼，乾坤日夜浮。',
    'highlight': '吴楚东南坼，乾坤日夜浮'
    },,
    {
    'type': 'classical',
    'title': '月夜',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '香雾云鬟湿，清辉玉臂寒。\n何时倚虚幌，双照泪痕干？',
    'highlight': '香雾云鬓湿，清辉玉臂寒'
    },,
    {
    'type': 'classical',
    'title': '茅屋为秋风所破歌',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '安得广厦千万间，大庇天下寒士俱欢颜！',
    'highlight': '安得广厦千万间，大庇天下寒士俱欢颜'
    },,
    {
    'type': 'classical',
    'title': '兵车行',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '牵衣顿足拦道哭，哭声直上干云霄。',
    'highlight': '牵衣顿足拦道哭，哭声直上干云霄'
    },,
    {
    'type': 'classical',
    'title': '丽人行',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '三月三日天气新，长安水边多丽人。',
    'highlight': '三月三日天气新，长安水边多丽人'
    },,
    {
    'type': 'classical',
    'title': '哀江头',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '少陵野老吞声哭，春日潜行曲江曲。',
    'highlight': '少陵野老吞声哭，春日潜行曲江曲'
    },,
    {
    'type': 'classical',
    'title': '月夜忆舍弟',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '露从今夜白，月是故乡明。\n有弟皆分散，无家问死生。',
    'highlight': '露从今夜白，月是故乡明'
    },,
    {
    'type': 'classical',
    'title': '赠花卿',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '此曲只应天上有，人间能得几回闻？',
    'highlight': '此曲只应天上有，人间能得几回闻'
    },,
    {
    'type': 'classical',
    'title': '曲江二首',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '穿花蛱蝶深深见，点水蜻蜓款款飞。',
    'highlight': '穿花蛱蝶深深见，点水蜻蜓款款飞'
    },,
    {
    'type': 'classical',
    'title': '对雪',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '乱云低薄暮，急雪舞回风。',
    'highlight': '乱云低薄暮，急雪舞回风'
    },,
    {
    'type': 'classical',
    'title': '江村',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '清江一曲抱村流，长夏江村事事幽。',
    'highlight': '清江一曲抱村流，长夏江村事事幽'
    },,
    {
    'type': 'classical',
    'title': '客至',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '花径不曾缘客扫，蓬门今始为君开。',
    'highlight': '花径不曾缘客扫，蓬门今始为君开'
    },,
    {
    'type': 'classical',
    'title': '狂夫',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '欲填沟壑唯疏放，自笑狂夫老更狂。',
    'highlight': '欲填沟壑唯疏放，自笑狂夫老更狂'
    },,
    {
    'type': 'classical',
    'title': '梦李白',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '故人入我梦，明我长相忆。',
    'highlight': '故人入我梦，明我长相忆'
    },,
    {
    'type': 'classical',
    'title': '天末怀李白',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '鸿雁几时到？江湖秋水多。',
    'highlight': '鸿雁几时到？江湖秋水多'
    },,
    {
    'type': 'classical',
    'title': '恨别',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '思家步月清宵立，忆弟看云白日眠。',
    'highlight': '思家步月清宵立，忆弟看云白日眠'
    },,
    {
    'type': 'classical',
    'title': '登高',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '无边落木萧萧下，不尽长江滚滚来。',
    'highlight': '无边落木萧萧下，不尽长江滚滚来'
    },,
    {
    'type': 'classical',
    'title': '宿府',
    'dynasty': '唐',
    'author': '杜甫',
    'content': '永夜角声悲自语，中天月色好谁看？',
    'highlight': '永夜角声悲自语，中天月色好谁看'
    },,
    {
    'type': 'classical',
    'title': '枫桥夜泊',
    'dynasty': '唐',
    'author': '张继',
    'content': '月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。',
    'highlight': '月落乌啼霜满天，江枫渔火对愁眠'
    },,
    {
    'type': 'classical',
    'title': '夜雨寄北',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '君问归期未有期，巴山夜雨涨秋池。\n何当共剪西窗烛，却话巴山夜雨时。',
    'highlight': '何当共剪西窗烛，却话巴山夜雨时'
    },,
    {
    'type': 'classical',
    'title': '锦瑟',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '此情可待成追忆，只是当时已惘然。',
    'highlight': '此情可待成追忆，只是当时已惘然'
    },,
    {
    'type': 'classical',
    'title': '无题',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '相见时难别亦难，东风无力百花残。\n春蚕到死丝方尽，蜡炬成灰泪始干。',
    'highlight': '春蚕到死丝方尽，蜡炬成灰泪始干'
    },,
    {
    'type': 'classical',
    'title': '无题',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '身无彩凤双飞翼，心有灵犀一点通。',
    'highlight': '身无彩凤双飞翼，心有灵犀一点通'
    },,
    {
    'type': 'classical',
    'title': '登乐游原',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '夕阳无限好，只是近黄昏。',
    'highlight': '夕阳无限好，只是近黄昏'
    },,
    {
    'type': 'classical',
    'title': '晚晴',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '天意怜幽草，人间重晚晴。',
    'highlight': '天意怜幽草，人间重晚晴'
    },,
    {
    'type': 'classical',
    'title': '安定城楼',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '永忆江湖归白发，欲回天地入扁舟。',
    'highlight': '永忆江湖归白发，欲回天地入扁舟'
    },,
    {
    'type': 'classical',
    'title': '隋宫',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '春风举国裁宫锦，半作障泥半作帆。',
    'highlight': '春风举国裁宫锦，半作障泥半作帆'
    },,
    {
    'type': 'classical',
    'title': '马嵬',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '如何四纪为天子，不及卢家有莫愁。',
    'highlight': '如何四纪为天子，不及卢家有莫愁'
    },,
    {
    'type': 'classical',
    'title': '宫辞',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '君恩如海深难测，妾意如炉暖欲然。',
    'highlight': '君恩如海深难测，妾意如炉暖欲然'
    },,
    {
    'type': 'classical',
    'title': '代赠',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '芭蕉不展丁香结，同向春风各自愁。',
    'highlight': '芭蕉不展丁香结，同向春风各自愁'
    },,
    {
    'type': 'classical',
    'title': '暮秋独游曲江',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '深知身在情长在，怅望江头江水声。',
    'highlight': '深知身在情长在，怅望江头江水声'
    },,
    {
    'type': 'classical',
    'title': '银河吹笙',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '怅望银河吹玉笙，楼寒院冷接平明。',
    'highlight': '怅望银河吹玉笙，楼寒院冷接平明'
    },,
    {
    'type': 'classical',
    'title': '花下醉',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '客散酒醒深夜后，更持红烛赏残花。',
    'highlight': '客散酒醒深夜后，更持红烛赏残花'
    },,
    {
    'type': 'classical',
    'title': '霜月',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '青女素娥俱耐冷，月中霜里斗婵娟。',
    'highlight': '青女素娥俱耐冷，月中霜里斗婵娟'
    },,
    {
    'type': 'classical',
    'title': '落花',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '肠断未忍扫，眼穿仍欲归。',
    'highlight': '肠断未忍扫，眼穿仍欲归'
    },,
    {
    'type': 'classical',
    'title': '泪',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '永巷长年怨绮罗，离情终日思风波。',
    'highlight': '永巷长年怨绮罗，离情终日思风波'
    },,
    {
    'type': 'classical',
    'title': '代赠',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '东南日出照高台，游女裙轻风满怀。',
    'highlight': '东南日出照高台，游女裙轻风满怀'
    },,
    {
    'type': 'classical',
    'title': '滞雨',
    'dynasty': '唐',
    'author': '李商隐',
    'content': '滞雨长安夜，残灯独客愁。',
    'highlight': '滞雨长安夜，残灯独客愁'
    },,
    {
    'type': 'classical',
    'title': '山行',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '远上寒山石径斜，白云生处有人家。\n停车坐爱枫林晚，霜叶红于二月花。',
    'highlight': '霜叶红于二月花'
    },,
    {
    'type': 'classical',
    'title': '清明',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有，牧童遥指杏花村。',
    'highlight': '清明时节雨纷纷，路上行人欲断魂'
    },,
    {
    'type': 'classical',
    'title': '泊秦淮',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '烟笼寒水月笼沙，夜泊秦淮近酒家。\n商女不知亡国恨，隔江犹唱后庭花。',
    'highlight': '商女不知亡国恨，隔江犹唱后庭花'
    },,
    {
    'type': 'classical',
    'title': '赤壁',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '东风不与周郎便，铜雀春深锁二乔。',
    'highlight': '东风不与周郎便，铜雀春深锁二乔'
    },,
    {
    'type': 'classical',
    'title': '江南春',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '南朝四百八十寺，多少楼台烟雨中。',
    'highlight': '南朝四百八十寺，多少楼台烟雨中'
    },,
    {
    'type': 'classical',
    'title': '寄扬州韩绰判官',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '二十四桥明月夜，玉人何处教吹箫。',
    'highlight': '二十四桥明月夜，玉人何处教吹箫'
    },,
    {
    'type': 'classical',
    'title': '赠别',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '春风十里扬州路，卷上珠帘总不如。',
    'highlight': '春风十里扬州路，卷上珠帘总不如'
    },,
    {
    'type': 'classical',
    'title': '遣怀',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '十年一觉扬州梦，赢得青楼薄幸名。',
    'highlight': '十年一觉扬州梦，赢得青楼薄幸名'
    },,
    {
    'type': 'classical',
    'title': '秋夕',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '天阶夜色凉如水，卧看牵牛织女星。',
    'highlight': '天阶夜色凉如水，卧看牵牛织女星'
    },,
    {
    'type': 'classical',
    'title': '过华清宫',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '一骑红尘妃子笑，无人知是荔枝来。',
    'highlight': '一骑红尘妃子笑，无人知是荔枝来'
    },,
    {
    'type': 'classical',
    'title': '紫薇花',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '桃李无言今何在？向风偏笑艳阳人。',
    'highlight': '桃李无言今何在？向风偏笑艳阳人'
    },,
    {
    'type': 'classical',
    'title': '题乌江亭',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '江东子弟多才俊，卷土重来未可知。',
    'highlight': '江东子弟多才俊，卷土重来未可知'
    },,
    {
    'type': 'classical',
    'title': '题宣州开元寺水阁',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '鸟去鸟来山色里，人歌人哭水声中。',
    'highlight': '鸟去鸟来山色里，人歌人哭水声中'
    },,
    {
    'type': 'classical',
    'title': '齐安郡中偶题',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '多少绿荷相倚恨，一时回首背西风。',
    'highlight': '多少绿荷相倚恨，一时回首背西风'
    },,
    {
    'type': 'classical',
    'title': '九日齐山登高',
    'dynasty': '唐',
    'author': '杜牧',
    'content': '尘世难逢开口笑，菊花须插满头归。',
    'highlight': '尘世难逢开口笑，菊花须插满头归'
    },,
    {
    'type': 'classical',
    'title': '暮江吟',
    'dynasty': '唐',
    'author': '白居易',
    'content': '一道残阳铺水中，半江瑟瑟半江红。\n可怜九月初三夜，露似真珠月似弓。',
    'highlight': '可怜九月初三夜，露似真珠月似弓'
    },,
    {
    'type': 'classical',
    'title': '赋得古原草送别',
    'dynasty': '唐',
    'author': '白居易',
    'content': '野火烧不尽，春风吹又生。\n远芳侵古道，晴翠接荒城。',
    'highlight': '野火烧不尽，春风吹又生'
    },,
    {
    'type': 'classical',
    'title': '问刘十九',
    'dynasty': '唐',
    'author': '白居易',
    'content': '晚来天欲雪，能饮一杯无？',
    'highlight': '晚来天欲雪，能饮一杯无'
    },,
    {
    'type': 'classical',
    'title': '忆江南',
    'dynasty': '唐',
    'author': '白居易',
    'content': '日出江花红胜火，春来江水绿如蓝。',
    'highlight': '日出江花红胜火，春来江水绿如蓝'
    },,
    {
    'type': 'classical',
    'title': '钱塘湖春行',
    'dynasty': '唐',
    'author': '白居易',
    'content': '几处早莺争暖树，谁家新燕啄春泥。\n乱花渐欲迷人眼，浅草才能没马蹄。',
    'highlight': '几处早莺争暖树，谁家新燕啄春泥'
    },,
    {
    'type': 'classical',
    'title': '琵琶行',
    'dynasty': '唐',
    'author': '白居易',
    'content': '同是天涯沦落人，相逢何必曾相识。',
    'highlight': '同是天涯沦落人，相逢何必曾相识'
    },,
    {
    'type': 'classical',
    'title': '长恨歌',
    'dynasty': '唐',
    'author': '白居易',
    'content': '在天愿作比翼鸟，在地愿为连理枝。',
    'highlight': '在天愿作比翼鸟，在地愿为连理枝'
    },,
    {
    'type': 'classical',
    'title': '卖炭翁',
    'dynasty': '唐',
    'author': '白居易',
    'content': '满面尘灰烟火色，两鬓苍苍十指黑。',
    'highlight': '满面尘灰烟火色，两鬓苍苍十指黑'
    },,
    {
    'type': 'classical',
    'title': '观刈麦',
    'dynasty': '唐',
    'author': '白居易',
    'content': '田家少闲月，五月人倍忙。',
    'highlight': '田家少闲月，五月人倍忙'
    },,
    {
    'type': 'classical',
    'title': '池上',
    'dynasty': '唐',
    'author': '白居易',
    'content': '小娃撑小艇，偷采白莲回。',
    'highlight': '小娃撑小艇，偷采白莲回'
    },,
    {
    'type': 'classical',
    'title': '白云泉',
    'dynasty': '唐',
    'author': '白居易',
    'content': '云自无心水自闲。',
    'highlight': '云自无心水自闲'
    },,
    {
    'type': 'classical',
    'title': '村夜',
    'dynasty': '唐',
    'author': '白居易',
    'content': '月明荞麦花如雪。',
    'highlight': '月明荞麦花如雪'
    },,
    {
    'type': 'classical',
    'title': '夜雪',
    'dynasty': '唐',
    'author': '白居易',
    'content': '夜深知雪重，时闻折竹声。',
    'highlight': '夜深知雪重，时闻折竹声'
    },,
    {
    'type': 'classical',
    'title': '浪淘沙',
    'dynasty': '唐',
    'author': '白居易',
    'content': '相恨不如潮有信，相思始觉海非深。',
    'highlight': '相恨不如潮有信，相思始觉海非深'
    },,
    {
    'type': 'classical',
    'title': '长相思',
    'dynasty': '唐',
    'author': '白居易',
    'content': '月明人倚楼。',
    'highlight': '月明人倚楼'
    },,
    {
    'type': 'classical',
    'title': '乌衣巷',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '旧时王谢堂前燕，飞入寻常百姓家。',
    'highlight': '旧时王谢堂前燕，飞入寻常百姓家'
    },,
    {
    'type': 'classical',
    'title': '望洞庭',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '湖光秋月两相和，潭面无风镜未磨。',
    'highlight': '湖光秋月两相和，潭面无风镜未磨'
    },,
    {
    'type': 'classical',
    'title': '陋室铭',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '山不在高，有仙则名。\n水不在深，有龙则灵。',
    'highlight': '山不在高，有仙则名'
    },,
    {
    'type': 'classical',
    'title': '秋词',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '晴空一鹤排云上，便引诗情到碧霄。',
    'highlight': '晴空一鹤排云上，便引诗情到碧霄'
    },,
    {
    'type': 'classical',
    'title': '竹枝词',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '东边日出西边雨，道是无晴却有晴。',
    'highlight': '东边日出西边雨，道是无晴却有晴'
    },,
    {
    'type': 'classical',
    'title': '浪淘沙',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '如今直上银河去，同到牵牛织女家。',
    'highlight': '如今直上银河去，同到牵牛织女家'
    },,
    {
    'type': 'classical',
    'title': '石头城',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '淮水东边旧时月，夜深还过女墙来。',
    'highlight': '淮水东边旧时月，夜深还过女墙来'
    },,
    {
    'type': 'classical',
    'title': '西塞山怀古',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '人世几回伤往事，山形依旧枕寒流。',
    'highlight': '人世几回伤往事，山形依旧枕寒流'
    },,
    {
    'type': 'classical',
    'title': '酬乐天咏老见示',
    'dynasty': '唐',
    'author': '刘禹锡',
    'content': '经事还谙事，阅人如阅川。',
    'highlight': '经事还谙事，阅人如阅川'
    },,
    {
    'type': 'classical',
    'title': '雁门太守行',
    'dynasty': '唐',
    'author': '李贺',
    'content': '黑云压城城欲摧，甲光向日金鳞开。',
    'highlight': '黑云压城城欲摧，甲光向日金鳞开'
    },,
    {
    'type': 'classical',
    'title': '马诗',
    'dynasty': '唐',
    'author': '李贺',
    'content': '大漠沙如雪，燕山月似钩。',
    'highlight': '大漠沙如雪，燕山月似钩'
    },,
    {
    'type': 'classical',
    'title': '南园',
    'dynasty': '唐',
    'author': '李贺',
    'content': '男儿何不带吴钩，收取关山五十州。',
    'highlight': '男儿何不带吴钩，收取关山五十州'
    },,
    {
    'type': 'classical',
    'title': '李凭箜篌引',
    'dynasty': '唐',
    'author': '李贺',
    'content': '江娥啼竹素女愁，李凭中国弹箜篌。',
    'highlight': '江娥啼竹素女愁，李凭中国弹箜篌'
    },,
    {
    'type': 'classical',
    'title': '商山早行',
    'dynasty': '唐',
    'author': '温庭筠',
    'content': '鸡声茅店月，人迹板桥霜。',
    'highlight': '鸡声茅店月，人迹板桥霜'
    },,
    {
    'type': 'classical',
    'title': '更漏子',
    'dynasty': '唐',
    'author': '温庭筠',
    'content': '梧桐树，三更雨，不道离情正苦。',
    'highlight': '梧桐树，三更雨，不道离情正苦'
    },,
    {
    'type': 'classical',
    'title': '望江南',
    'dynasty': '唐',
    'author': '温庭筠',
    'content': '过尽千帆皆不是，斜晖脉脉水悠悠。',
    'highlight': '过尽千帆皆不是，斜晖脉脉水悠悠'
    },,
    {
    'type': 'classical',
    'title': '早春呈水部张十八员外',
    'dynasty': '唐',
    'author': '韩愈',
    'content': '天街小雨润如酥，草色遥看近却无。',
    'highlight': '天街小雨润如酥，草色遥看近却无'
    },,
    {
    'type': 'classical',
    'title': '左迁至蓝关示侄孙湘',
    'dynasty': '唐',
    'author': '韩愈',
    'content': '一封朝奏九重天，夕贬潮州路八千。',
    'highlight': '一封朝奏九重天，夕贬潮州路八千'
    },,
    {
    'type': 'classical',
    'title': '晚春',
    'dynasty': '唐',
    'author': '韩愈',
    'content': '草树知春不久归，百般红紫斗芳菲。',
    'highlight': '草树知春不久归，百般红紫斗芳菲'
    },,
    {
    'type': 'classical',
    'title': '春雪',
    'dynasty': '唐',
    'author': '韩愈',
    'content': '白雪却嫌春色晚，故穿庭树作飞花。',
    'highlight': '白雪却嫌春色晚，故穿庭树作飞花'
    },,
    {
    'type': 'classical',
    'title': '江雪',
    'dynasty': '唐',
    'author': '柳宗元',
    'content': '千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。',
    'highlight': '千山鸟飞绝，万径人踪灭'
    },,
    {
    'type': 'classical',
    'title': '渔翁',
    'dynasty': '唐',
    'author': '柳宗元',
    'content': '烟销日出不见人，欸乃一声山水绿。',
    'highlight': '烟销日出不见人，欸乃一声山水绿'
    },,
    {
    'type': 'classical',
    'title': '逢入京使',
    'dynasty': '唐',
    'author': '岑参',
    'content': '马上相逢无纸笔，凭君传语报平安。',
    'highlight': '马上相逢无纸笔，凭君传语报平安'
    },,
    {
    'type': 'classical',
    'title': '白雪歌送武判官归京',
    'dynasty': '唐',
    'author': '岑参',
    'content': '忽如一夜春风来，千树万树梨花开。',
    'highlight': '忽如一夜春风来，千树万树梨花开'
    },,
    {
    'type': 'classical',
    'title': '别董大',
    'dynasty': '唐',
    'author': '高适',
    'content': '莫愁前路无知己，天下谁人不识君。',
    'highlight': '莫愁前路无知己，天下谁人不识君'
    },,
    {
    'type': 'classical',
    'title': '塞上听吹笛',
    'dynasty': '唐',
    'author': '高适',
    'content': '雪净胡天牧马还，月明羌笛戍楼间。',
    'highlight': '雪净胡天牧马还，月明羌笛戍楼间'
    },,
    {
    'type': 'classical',
    'title': '题李凝幽居',
    'dynasty': '唐',
    'author': '贾岛',
    'content': '鸟宿池边树，僧敲月下门。',
    'highlight': '鸟宿池边树，僧敲月下门'
    },,
    {
    'type': 'classical',
    'title': '寻隐者不遇',
    'dynasty': '唐',
    'author': '贾岛',
    'content': '只在此山中，云深不知处。',
    'highlight': '只在此山中，云深不知处'
    },,
    {
    'type': 'classical',
    'title': '剑客',
    'dynasty': '唐',
    'author': '贾岛',
    'content': '十年磨一剑，霜刃未曾试。',
    'highlight': '十年磨一剑，霜刃未曾试'
    },,
    {
    'type': 'classical',
    'title': '滁州西涧',
    'dynasty': '唐',
    'author': '韦应物',
    'content': '春潮带雨晚来急，野渡无人舟自横。',
    'highlight': '春潮带雨晚来急，野渡无人舟自横'
    },,
    {
    'type': 'classical',
    'title': '秋夜寄邱员外',
    'dynasty': '唐',
    'author': '韦应物',
    'content': '空山松子落，幽人应未眠。',
    'highlight': '空山松子落，幽人应未眠'
    },,
    {
    'type': 'classical',
    'title': '望月怀远',
    'dynasty': '唐',
    'author': '张九龄',
    'content': '海上生明月，天涯共此时。',
    'highlight': '海上生明月，天涯共此时'
    },,
    {
    'type': 'classical',
    'title': '送杜少府之任蜀州',
    'dynasty': '唐',
    'author': '王勃',
    'content': '海内存知己，天涯若比邻。',
    'highlight': '海内存知己，天涯若比邻'
    },,
    {
    'type': 'classical',
    'title': '山中',
    'dynasty': '唐',
    'author': '王勃',
    'content': '况属高风晚，山山黄叶飞。',
    'highlight': '况属高风晚，山山黄叶飞'
    },,
    {
    'type': 'classical',
    'title': '塞下曲',
    'dynasty': '唐',
    'author': '卢纶',
    'content': '欲将轻骑逐，大雪满弓刀。',
    'highlight': '欲将轻骑逐，大雪满弓刀'
    },,
    {
    'type': 'classical',
    'title': '塞下曲',
    'dynasty': '唐',
    'author': '卢纶',
    'content': '林暗草惊风，将军夜引弓。',
    'highlight': '林暗草惊风，将军夜引弓'
    },,
    {
    'type': 'classical',
    'title': '夜上受降城闻笛',
    'dynasty': '唐',
    'author': '李益',
    'content': '不知何处吹芦管，一夜征人尽望乡。',
    'highlight': '不知何处吹芦管，一夜征人尽望乡'
    },,
    {
    'type': 'classical',
    'title': '写情',
    'dynasty': '唐',
    'author': '李益',
    'content': '从此无心爱良夜，任他明月下西楼。',
    'highlight': '从此无心爱良夜，任他明月下西楼'
    },,
    {
    'type': 'classical',
    'title': '离思',
    'dynasty': '唐',
    'author': '元稹',
    'content': '曾经沧海难为水，除却巫山不是云。',
    'highlight': '曾经沧海难为水，除却巫山不是云'
    },,
    {
    'type': 'classical',
    'title': '菊花',
    'dynasty': '唐',
    'author': '元稹',
    'content': '不是花中偏爱菊，此花开尽更无花。',
    'highlight': '不是花中偏爱菊，此花开尽更无花'
    },,
    {
    'type': 'classical',
    'title': '咸阳城西楼晚眺',
    'dynasty': '唐',
    'author': '许浑',
    'content': '山雨欲来风满楼。',
    'highlight': '山雨欲来风满楼'
    },,
    {
    'type': 'classical',
    'title': '题金陵渡',
    'dynasty': '唐',
    'author': '张祜',
    'content': '潮落夜江斜月里，两三星火是瓜州。',
    'highlight': '潮落夜江斜月里，两三星火是瓜州'
    },,
    {
    'type': 'classical',
    'title': '宫词',
    'dynasty': '唐',
    'author': '张祜',
    'content': '一声何满子，双泪落君前。',
    'highlight': '一声何满子，双泪落君前'
    },,
    {
    'type': 'classical',
    'title': '题都城南庄',
    'dynasty': '唐',
    'author': '崔护',
    'content': '人面不知何处去，桃花依旧笑春风。',
    'highlight': '人面不知何处去，桃花依旧笑春风'
    },,
    {
    'type': 'classical',
    'title': '春江花月夜',
    'dynasty': '唐',
    'author': '张若虚',
    'content': '江畔何人初见月，江月何年初照人？',
    'highlight': '江畔何人初见月，江月何年初照人'
    },,
    {
    'type': 'classical',
    'title': '金缕衣',
    'dynasty': '唐',
    'author': '杜秋娘',
    'content': '花开堪折直须折，莫待无花空折枝。',
    'highlight': '花开堪折直须折，莫待无花空折枝'
    },,
    {
    'type': 'classical',
    'title': '水调歌头',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '但愿人长久，千里共婵娟。',
    'highlight': '但愿人长久，千里共婵娟'
    },,
    {
    'type': 'classical',
    'title': '念奴娇·赤壁怀古',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '大江东去，浪淘尽、千古风流人物。',
    'highlight': '大江东去，浪淘尽千古风流人物'
    },,
    {
    'type': 'classical',
    'title': '江城子·乙卯正月二十日夜记梦',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '十年生死两茫茫，不思量，自难忘。',
    'highlight': '十年生死两茫茫，不思量，自难忘'
    },,
    {
    'type': 'classical',
    'title': '定风波',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '一蓑烟雨任平生。',
    'highlight': '一蓑烟雨任平生'
    },,
    {
    'type': 'classical',
    'title': '蝶恋花',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '天涯何处无芳草。',
    'highlight': '天涯何处无芳草'
    },,
    {
    'type': 'classical',
    'title': '饮湖上初晴后雨',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '欲把西湖比西子，淡妆浓抹总相宜。',
    'highlight': '欲把西湖比西子，淡妆浓抹总相宜'
    },,
    {
    'type': 'classical',
    'title': '题西林壁',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '不识庐山真面目，只缘身在此山中。',
    'highlight': '不识庐山真面目，只缘身在此山中'
    },,
    {
    'type': 'classical',
    'title': '江城子·密州出猎',
    'dynasty': '宋',
    'author': '苏轼',
    'content': '老夫聊发少年狂，左牵黄，右擎苍。',
    'highlight': '老夫聊发少年狂，左牵黄，右擎苍'
    },,
    {
    'type': 'classical',
    'title': '临江仙',
    'dynasty': '宋',
    'author': '晏几道',
    'content': '落花人独立，微雨燕双飞。',
    'highlight': '落花人独立，微雨燕双飞'
    },,
    {
    'type': 'classical',
    'title': '鹧鸪天',
    'dynasty': '宋',
    'author': '晏几道',
    'content': '今宵剩把银釭照，犹恐相逢是梦中。',
    'highlight': '今宵剩把银釭照，犹恐相逢是梦中'
    },,
    {
    'type': 'classical',
    'title': '蝶恋花',
    'dynasty': '宋',
    'author': '晏殊',
    'content': '昨夜西风凋碧树，独上高楼，望尽天涯路。',
    'highlight': '昨夜西风凋碧树，独上高楼，望尽天涯路'
    },,
    {
    'type': 'classical',
    'title': '浣溪沙',
    'dynasty': '宋',
    'author': '晏殊',
    'content': '无可奈何花落去，似曾相识燕归来。',
    'highlight': '无可奈何花落去，似曾相识燕归来'
    },,
    {
    'type': 'classical',
    'title': '破阵子',
    'dynasty': '宋',
    'author': '辛弃疾',
    'content': '了却君王天下事，赢得生前身后名。',
    'highlight': '了却君王天下事，赢得生前身后名'
    },,
    {
    'type': 'classical',
    'title': '青玉案·元夕',
    'dynasty': '宋',
    'author': '辛弃疾',
    'content': '众里寻他千百度，蓦然回首，\n那人却在，灯火阑珊处。',
    'highlight': '众里寻他千百度，那人却在灯火阑珊处'
    },,
    {
    'type': 'classical',
    'title': '永遇乐·京口北固亭怀古',
    'dynasty': '宋',
    'author': '辛弃疾',
    'content': '想当年、金戈铁马，气吞万里如虎。',
    'highlight': '想当年金戈铁马，气吞万里如虎'
    },,
    {
    'type': 'classical',
    'title': '西江月·夜行黄沙道中',
    'dynasty': '宋',
    'author': '辛弃疾',
    'content': '明月别枝惊鹊，清风半夜鸣蝉。',
    'highlight': '明月别枝惊鹊，清风半夜鸣蝉'
    },,
    {
    'type': 'classical',
    'title': '丑奴儿·书博山道中壁',
    'dynasty': '宋',
    'author': '辛弃疾',
    'content': '而今识尽愁滋味，欲说还休。',
    'highlight': '而今识尽愁滋味，欲说还休'
    },,
    {
    'type': 'classical',
    'title': '如梦令',
    'dynasty': '宋',
    'author': '李清照',
    'content': '常记溪亭日暮，沉醉不知归路。',
    'highlight': '常记溪亭日暮，沉醉不知归路'
    },,
    {
    'type': 'classical',
    'title': '一剪梅',
    'dynasty': '宋',
    'author': '李清照',
    'content': '此情无计可消除，才下眉头，却上心头。',
    'highlight': '此情无计可消除，才下眉头，却上心头'
    },,
    {
    'type': 'classical',
    'title': '醉花阴',
    'dynasty': '宋',
    'author': '李清照',
    'content': '莫道不销魂，帘卷西风，人比黄花瘦。',
    'highlight': '莫道不销魂，帘卷西风，人比黄花瘦'
    },,
    {
    'type': 'classical',
    'title': '声声慢',
    'dynasty': '宋',
    'author': '李清照',
    'content': '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。',
    'highlight': '寻寻觅觅，冷冷清清，凄凄惨惨戚戚'
    },,
    {
    'type': 'classical',
    'title': '武陵春',
    'dynasty': '宋',
    'author': '李清照',
    'content': '只恐双溪舴艋舟，载不动许多愁。',
    'highlight': '只恐双溪舴艋舟，载不动许多愁'
    },,
    {
    'type': 'classical',
    'title': '雨霖铃',
    'dynasty': '宋',
    'author': '柳永',
    'content': '多情自古伤离别，更那堪、冷落清秋节！',
    'highlight': '多情自古伤离别，更那堪冷落清秋节'
    },,
    {
    'type': 'classical',
    'title': '蝶恋花',
    'dynasty': '宋',
    'author': '柳永',
    'content': '衣带渐宽终不悔，为伊消得人憔悴。',
    'highlight': '衣带渐宽终不悔，为伊消得人憔悴'
    },,
    {
    'type': 'classical',
    'title': '望海潮',
    'dynasty': '宋',
    'author': '柳永',
    'content': '三秋桂子，十里荷花。',
    'highlight': '三秋桂子，十里荷花'
    },,
    {
    'type': 'classical',
    'title': '苏幕遮',
    'dynasty': '宋',
    'author': '范仲淹',
    'content': '明月楼高休独倚，酒入愁肠，化作相思泪。',
    'highlight': '明月楼高休独倚，酒入愁肠化作相思泪'
    },,
    {
    'type': 'classical',
    'title': '渔家傲',
    'dynasty': '宋',
    'author': '范仲淹',
    'content': '浊酒一杯家万里，燕然未勒归无计。',
    'highlight': '浊酒一杯家万里，燕然未勒归无计'
    },,
    {
    'type': 'classical',
    'title': '蝶恋花',
    'dynasty': '宋',
    'author': '欧阳修',
    'content': '泪眼问花花不语，乱红飞过秋千去。',
    'highlight': '泪眼问花花不语，乱红飞过秋千去'
    },,
    {
    'type': 'classical',
    'title': '生查子',
    'dynasty': '宋',
    'author': '欧阳修',
    'content': '月上柳梢头，人约黄昏后。',
    'highlight': '月上柳梢头，人约黄昏后'
    },,
    {
    'type': 'classical',
    'title': '踏莎行',
    'dynasty': '宋',
    'author': '欧阳修',
    'content': '平芜尽处是春山，行人更在春山外。',
    'highlight': '平芜尽处是春山，行人更在春山外'
    },,
    {
    'type': 'classical',
    'title': '桂枝香',
    'dynasty': '宋',
    'author': '王安石',
    'content': '六朝旧事随流水，但寒烟、芳草凝绿。',
    'highlight': '六朝旧事随流水，但寒烟芳草凝绿'
    },,
    {
    'type': 'classical',
    'title': '泊船瓜洲',
    'dynasty': '宋',
    'author': '王安石',
    'content': '春风又绿江南岸，明月何时照我还。',
    'highlight': '春风又绿江南岸，明月何时照我还'
    },,
    {
    'type': 'classical',
    'title': '元日',
    'dynasty': '宋',
    'author': '王安石',
    'content': '千门万户曈曈日，总把新桃换旧符。',
    'highlight': '千门万户曈曈日，总把新桃换旧符'
    },,
    {
    'type': 'classical',
    'title': '卜算子',
    'dynasty': '宋',
    'author': '陆游',
    'content': '零落成泥碾作尘，只有香如故。',
    'highlight': '零落成泥碾作尘，只有香如故'
    },,
    {
    'type': 'classical',
    'title': '示儿',
    'dynasty': '宋',
    'author': '陆游',
    'content': '死去元知万事空，但悲不见九州同。',
    'highlight': '死去元知万事空，但悲不见九州同'
    },,
    {
    'type': 'classical',
    'title': '书愤',
    'dynasty': '宋',
    'author': '陆游',
    'content': '楼船夜雪瓜洲渡，铁马秋风大散关。',
    'highlight': '楼船夜雪瓜洲渡，铁马秋风大散关'
    },,
    {
    'type': 'classical',
    'title': '游山西村',
    'dynasty': '宋',
    'author': '陆游',
    'content': '山重水复疑无路，柳暗花明又一村。',
    'highlight': '山重水复疑无路，柳暗花明又一村'
    },,
    {
    'type': 'classical',
    'title': '临安春雨初霁',
    'dynasty': '宋',
    'author': '陆游',
    'content': '小楼一夜听春雨，深巷明朝卖杏花。',
    'highlight': '小楼一夜听春雨，深巷明朝卖杏花'
    },,
    {
    'type': 'classical',
    'title': '天净沙·秋思',
    'dynasty': '元',
    'author': '马致远',
    'content': '夕阳西下，断肠人在天涯。',
    'highlight': '夕阳西下，断肠人在天涯'
    },,
    {
    'type': 'classical',
    'title': '天净沙·秋',
    'dynasty': '元',
    'author': '白朴',
    'content': '孤村落日残霞，轻烟老树寒鸦。',
    'highlight': '孤村落日残霞，轻烟老树寒鸦'
    },,
    {
    'type': 'classical',
    'title': '山坡羊·潼关怀古',
    'dynasty': '元',
    'author': '张养浩',
    'content': '兴，百姓苦；亡，百姓苦。',
    'highlight': '兴，百姓苦；亡，百姓苦'
    },,
    {
    'type': 'classical',
    'title': '卖花声·怀古',
    'dynasty': '元',
    'author': '张可久',
    'content': '伤心秦汉，生民涂炭，读书人一声长叹。',
    'highlight': '伤心秦汉，生民涂炭，读书人一声长叹'
    },,
    {
    'type': 'classical',
    'title': '石灰吟',
    'dynasty': '明',
    'author': '于谦',
    'content': '粉骨碎身浑不怕，要留清白在人间。',
    'highlight': '粉骨碎身浑不怕，要留清白在人间'
    },,
    {
    'type': 'classical',
    'title': '临江仙',
    'dynasty': '明',
    'author': '杨慎',
    'content': '青山依旧在，几度夕阳红。',
    'highlight': '青山依旧在，几度夕阳红'
    },,
    {
    'type': 'classical',
    'title': '明日歌',
    'dynasty': '明',
    'author': '钱福',
    'content': '明日复明日，明日何其多。',
    'highlight': '明日复明日，明日何其多'
    },,
    {
    'type': 'classical',
    'title': '出塞',
    'dynasty': '清',
    'author': '徐锡麟',
    'content': '只解沙场为国死，何须马革裹尸还。',
    'highlight': '只解沙场为国死，何须马革裹尸还'
    },,
    {
    'type': 'classical',
    'title': '己亥杂诗',
    'dynasty': '清',
    'author': '龚自珍',
    'content': '我劝天公重抖擞，不拘一格降人才。',
    'highlight': '我劝天公重抖擞，不拘一格降人才'
    },,
    {
    'type': 'classical',
    'title': '己亥杂诗',
    'dynasty': '清',
    'author': '龚自珍',
    'content': '落红不是无情物，化作春泥更护花。',
    'highlight': '落红不是无情物，化作春泥更护花'
    },,
    {
    'type': 'classical',
    'title': '狱中题壁',
    'dynasty': '清',
    'author': '谭嗣同',
    'content': '我自横刀向天笑，去留肝胆两昆仑。',
    'highlight': '我自横刀向天笑，去留肝胆两昆仑'
    },,
    {
    'type': 'classical',
    'title': '黄海舟中日人索句',
    'dynasty': '清',
    'author': '秋瑾',
    'content': '拚将十万头颅血，须把乾坤力挽回。',
    'highlight': '拚将十万头颅血，须把乾坤力挽回'
    },,
    {
    'type': 'classical',
    'title': '对酒',
    'dynasty': '清',
    'author': '秋瑾',
    'content': '一腔热血勤珍重，洒去犹能化碧涛。',
    'highlight': '一腔热血勤珍重，洒去犹能化碧涛'
    },,
    {
    'type': 'modern',
    'title': '雨巷',
    'dynasty': '现代',
    'author': '戴望舒',
    'content': '我希望逢着，一个丁香一样地结着愁怨的姑娘。',
    'highlight': '我希望逢着，一个丁香一样地结着愁怨的姑娘'
    },,
    {
    'type': 'modern',
    'title': '面朝大海，春暖花开',
    'dynasty': '现代',
    'author': '海子',
    'content': '我有一所房子，面朝大海，春暖花开',
    'highlight': '我有一所房子，面朝大海，春暖花开'
    },,
    {
    'type': 'modern',
    'title': '一代人',
    'dynasty': '现代',
    'author': '顾城',
    'content': '黑夜给了我黑色的眼睛，我却用它寻找光明。',
    'highlight': '黑夜给了我黑色的眼睛，我却用它寻找光明'
    },,
    {
    'type': 'modern',
    'title': '门前',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我们站着，不说话，就十分美好。',
    'highlight': '我们站着，不说话，就十分美好'
    },,
    {
    'type': 'modern',
    'title': '远和近',
    'dynasty': '现代',
    'author': '顾城',
    'content': '你看我时很远，你看云时很近。',
    'highlight': '你看我时很远，你看云时很近'
    },,
    {
    'type': 'modern',
    'title': '致橡树',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '根，紧握在地下；叶，相触在云里。',
    'highlight': '根，紧握在地下；叶，相触在云里'
    },,
    {
    'type': 'modern',
    'title': '祖国啊，我亲爱的祖国',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '我是你河边上破旧的老水车，数百年来纺着疲惫的歌。',
    'highlight': '我是你河边上破旧的老水车'
    },,
    {
    'type': 'modern',
    'title': '偶然',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '偶尔投影在你的波心。',
    'highlight': '偶尔投影在你的波心'
    },,
    {
    'type': 'modern',
    'title': '再别康桥',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '轻轻的我走了，正如我轻轻的来。',
    'highlight': '轻轻的我走了，正如我轻轻的来'
    },,
    {
    'type': 'modern',
    'title': '沙扬娜拉',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
    'highlight': '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞'
    },,
    {
    'type': 'modern',
    'title': '我不知道风是在哪一个方向吹',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '我是在梦中，在梦的轻波里依洄。',
    'highlight': '我是在梦中，在梦的轻波里依洄'
    },,
    {
    'type': 'modern',
    'title': '乡愁',
    'dynasty': '现代',
    'author': '余光中',
    'content': '乡愁是一枚小小的邮票，我在这头，母亲在那头。',
    'highlight': '乡愁是一枚小小的邮票，我在这头，母亲在那头'
    },,
    {
    'type': 'modern',
    'title': '乡愁四韵',
    'dynasty': '现代',
    'author': '余光中',
    'content': '给我一瓢长江水啊长江水，酒一样的长江水。',
    'highlight': '给我一瓢长江水啊长江水，酒一样的长江水'
    },,
    {
    'type': 'modern',
    'title': '你是人间的四月天',
    'dynasty': '现代',
    'author': '林徽因',
    'content': '你是人间的四月天；笑响点亮了四面风。',
    'highlight': '你是人间的四月天，笑响点亮了四面风'
    },,
    {
    'type': 'modern',
    'title': '别丢掉',
    'dynasty': '现代',
    'author': '林徽因',
    'content': '别丢掉，这一把过往的热情。',
    'highlight': '别丢掉，这一把过往的热情'
    },,
    {
    'type': 'modern',
    'title': '断章',
    'dynasty': '现代',
    'author': '卞之琳',
    'content': '你站在桥上看风景，看风景的人在楼上看你。',
    'highlight': '你站在桥上看风景，看风景的人在楼上看你'
    },,
    {
    'type': 'modern',
    'title': '镜中',
    'dynasty': '现代',
    'author': '张枣',
    'content': '只要想起一生中后悔的事，梅花便落了下来。',
    'highlight': '只要想起一生中后悔的事，梅花便落了下来'
    },,
    {
    'type': 'modern',
    'title': '回答',
    'dynasty': '现代',
    'author': '北岛',
    'content': '卑鄙是卑鄙者的通行证，高尚是高尚者的墓志铭。',
    'highlight': '卑鄙是卑鄙者的通行证，高尚是高尚者的墓志铭'
    },,
    {
    'type': 'modern',
    'title': '一切',
    'dynasty': '现代',
    'author': '北岛',
    'content': '一切都是命运，一切都是烟云。',
    'highlight': '一切都是命运，一切都是烟云'
    },,
    {
    'type': 'modern',
    'title': '走吧',
    'dynasty': '现代',
    'author': '北岛',
    'content': '我们去找寻生命的湖。',
    'highlight': '我们去找寻生命的湖'
    },,
    {
    'type': 'modern',
    'title': '错误',
    'dynasty': '现代',
    'author': '郑愁予',
    'content': '我达达的马蹄是美丽的错误，我不是归人，是个过客。',
    'highlight': '我达达的马蹄是美丽的错误，我不是归人，是个过客'
    },,
    {
    'type': 'modern',
    'title': '亚洲铜',
    'dynasty': '现代',
    'author': '海子',
    'content': '亚洲铜，亚洲铜，祖父死在这里，父亲死在这里。',
    'highlight': '亚洲铜，亚洲铜，祖父死在这里'
    },,
    {
    'type': 'modern',
    'title': '日记',
    'dynasty': '现代',
    'author': '海子',
    'content': '姐姐，今夜我不关心人类，我只想你。',
    'highlight': '姐姐，今夜我不关心人类，我只想你'
    },,
    {
    'type': 'modern',
    'title': '九月',
    'dynasty': '现代',
    'author': '海子',
    'content': '目击众神死亡的草原上野花一片。',
    'highlight': '目击众神死亡的草原上野花一片'
    },,
    {
    'type': 'modern',
    'title': '活在这珍贵的人间',
    'dynasty': '现代',
    'author': '海子',
    'content': '活在这珍贵的人间，太阳强烈，水波温柔。',
    'highlight': '活在这珍贵的人间，太阳强烈，水波温柔'
    },,
    {
    'type': 'modern',
    'title': '半截的诗',
    'dynasty': '现代',
    'author': '海子',
    'content': '你是我的半截的诗，半截用心爱，半截用泥埋。',
    'highlight': '你是我的半截的诗，半截用心爱，半截用泥埋'
    },,
    {
    'type': 'modern',
    'title': '玛格丽',
    'dynasty': '现代',
    'author': '多多',
    'content': '我的家蝇的和摇着尾巴的狗，在你的家。',
    'highlight': '我的家蝇的和摇着尾巴的狗'
    },,
    {
    'type': 'modern',
    'title': '春之舞',
    'dynasty': '现代',
    'author': '多多',
    'content': '松树与柏树还没有合拢，小草已在笑。',
    'highlight': '松树与柏树还没有合拢，小草已在笑'
    },,
    {
    'type': 'modern',
    'title': '有关大雁塔',
    'dynasty': '现代',
    'author': '韩东',
    'content': '有关大雁塔，我们又能知道些什么。',
    'highlight': '有关大雁塔，我们又能知道些什么'
    },,
    {
    'type': 'modern',
    'title': '尚义街6号',
    'dynasty': '现代',
    'author': '于坚',
    'content': '尚义街6号，法国梧桐沿街长着。',
    'highlight': '尚义街6号，法国梧桐沿街长着'
    },,
    {
    'type': 'modern',
    'title': '饿死诗人',
    'dynasty': '现代',
    'author': '伊沙',
    'content': '轻点，别把穿过骨肉的笔弄断。',
    'highlight': '轻点，别把穿过骨肉的笔弄断'
    },,
    {
    'type': 'modern',
    'title': '守夜人',
    'dynasty': '现代',
    'author': '余怒',
    'content': '我坐在灯下，想一些关于夜的事。',
    'highlight': '我坐在灯下，想一些关于夜的事'
    },,
    {
    'type': 'modern',
    'title': '等人',
    'dynasty': '现代',
    'author': '小安',
    'content': '我等一个电话，从早上到晚上。',
    'highlight': '我等一个电话，从早上到晚上'
    },,
    {
    'type': 'modern',
    'title': '方向',
    'dynasty': '现代',
    'author': '宋晓贤',
    'content': '每一个黎明，我向左，向右，都是方向。',
    'highlight': '每一个黎明，我向左，向右，都是方向'
    },,
    {
    'type': 'modern',
    'title': '雪花的快乐',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '假若我是一朵雪花，翩翩的在半空里潇洒。',
    'highlight': '假若我是一朵雪花，翩翩的在半空里潇洒'
    },,
    {
    'type': 'modern',
    'title': '沪杭车中',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '匆匆匆！催催催！一宵烟雨旷野里。',
    'highlight': '匆匆匆！催催催！一宵烟雨旷野里'
    },,
    {
    'type': 'modern',
    'title': '我用残损的手掌',
    'dynasty': '现代',
    'author': '戴望舒',
    'content': '我用残损的手掌摸索这广大的土地。',
    'highlight': '我用残损的手掌摸索这广大的土地'
    },,
    {
    'type': 'modern',
    'title': '秋天的梦',
    'dynasty': '现代',
    'author': '戴望舒',
    'content': '秋天的梦是轻的，那是窭女的爱人们的影。',
    'highlight': '秋天的梦是轻的，那是窭女的爱人们的影'
    },,
    {
    'type': 'modern',
    'title': '乐园鸟',
    'dynasty': '现代',
    'author': '戴望舒',
    'content': '这是秋天的梦呢，还是春的呢？',
    'highlight': '这是秋天的梦呢，还是春的呢'
    },,
    {
    'type': 'modern',
    'title': '古神祠前',
    'dynasty': '现代',
    'author': '戴望舒',
    'content': '从前轻轻飞去了的蜻蜓，如今又慢慢地飞回来。',
    'highlight': '从前轻轻飞去了的蜻蜓，如今又慢慢地飞回来'
    },,
    {
    'type': 'modern',
    'title': '碧潭',
    'dynasty': '现代',
    'author': '余光中',
    'content': '十六柄桂桨敲碎青琉璃。',
    'highlight': '十六柄桂桨敲碎青琉璃'
    },,
    {
    'type': 'modern',
    'title': '永远，我等',
    'dynasty': '现代',
    'author': '余光中',
    'content': '如果早晨听见你倾吐，最美的那动词。',
    'highlight': '如果早晨听见你倾吐，最美的那动词'
    },,
    {
    'type': 'modern',
    'title': '风铃',
    'dynasty': '现代',
    'author': '余光中',
    'content': '我的心是七层塔檐上悬挂的风铃，叮咛叮咛咛。',
    'highlight': '我的心是七层塔檐上悬挂的风铃，叮咛叮咛咛'
    },,
    {
    'type': 'modern',
    'title': '深夜里听到乐声',
    'dynasty': '现代',
    'author': '林徽因',
    'content': '这一定又是你的手指，轻弹着，在这深夜。',
    'highlight': '这一定又是你的手指，轻弹着，在这深夜'
    },,
    {
    'type': 'modern',
    'title': '笑',
    'dynasty': '现代',
    'author': '林徽因',
    'content': '笑的是她的眼睛，口唇，和唇边浑圆的漩涡。',
    'highlight': '笑的是她的眼睛，口唇，和唇边浑圆的漩涡'
    },,
    {
    'type': 'modern',
    'title': '赞美',
    'dynasty': '现代',
    'author': '穆旦',
    'content': '有多少伦夫俗子，宣称自己是世界的光。',
    'highlight': '有多少伦夫俗子，宣称自己是世界的光'
    },,
    {
    'type': 'modern',
    'title': '春',
    'dynasty': '现代',
    'author': '穆旦',
    'content': '绿色的火焰在草地上，轻轻地轻轻地。',
    'highlight': '绿色的火焰在草地上，轻轻地轻轻地'
    },,
    {
    'type': 'modern',
    'title': '黄昏',
    'dynasty': '现代',
    'author': '穆旦',
    'content': '现实和梦乡相距，不过一尺之遥。',
    'highlight': '现实和梦乡相距，不过一尺之遥'
    },,
    {
    'type': 'modern',
    'title': '冬夜',
    'dynasty': '现代',
    'author': '穆旦',
    'content': '城墙的风说着什么，它说等待，等待雪。',
    'highlight': '城墙的风说着什么，它说等待'
    },,
    {
    'type': 'modern',
    'title': '赋别',
    'dynasty': '现代',
    'author': '郑愁予',
    'content': '这次我离开你，是风，是雨，是夜晚。',
    'highlight': '这次我离开你，是风，是雨，是夜晚'
    },,
    {
    'type': 'modern',
    'title': '如雾起时',
    'dynasty': '现代',
    'author': '郑愁予',
    'content': '我从海上来，带回航海的针。',
    'highlight': '我从海上来，带回航海的针'
    },,
    {
    'type': 'modern',
    'title': '圆宝盒',
    'dynasty': '现代',
    'author': '卞之琳',
    'content': '我幻想在最底层最圆最圆的海里睡着。',
    'highlight': '我幻想在最底层最圆最圆的海里睡着'
    },,
    {
    'type': 'modern',
    'title': '旧元夜',
    'dynasty': '现代',
    'author': '卞之琳',
    'content': '隔着一层纸，我的屋子里也造了一座塔。',
    'highlight': '隔着一层纸，我的屋子里也造了一座塔'
    },,
    {
    'type': 'modern',
    'title': '答复',
    'dynasty': '现代',
    'author': '海子',
    'content': '麦地，别人看见你，觉得你温暖，美丽。',
    'highlight': '麦地，别人看见你，觉得你温暖，美丽'
    },,
    {
    'type': 'modern',
    'title': '麦地与诗人',
    'dynasty': '现代',
    'author': '海子',
    'content': '诗人啊，你要找到自己，先要去爱麦子。',
    'highlight': '诗人啊，你要找到自己，先要去爱麦子'
    },,
    {
    'type': 'modern',
    'title': '十四行：玫瑰花',
    'dynasty': '现代',
    'author': '海子',
    'content': '玫瑰花，豌豆花，它们把天空还给牛羊。',
    'highlight': '玫瑰花，豌豆花，它们把天空还给牛羊'
    },,
    {
    'type': 'modern',
    'title': '春光乍泄',
    'dynasty': '现代',
    'author': '杨黎',
    'content': '我从未来过这里，只有一些人在那里笑着。',
    'highlight': '我从未来过这里，只有一些人在那里笑着'
    },,
    {
    'type': 'modern',
    'title': '温柔',
    'dynasty': '现代',
    'author': '韩东',
    'content': '有一年，我在一个小镇上住，那里很静。',
    'highlight': '有一年，我在一个小镇上住，那里很静'
    },,
    {
    'type': 'modern',
    'title': '中文系',
    'dynasty': '现代',
    'author': '李亚伟',
    'content': '中文系是一条流动的河，老师在岸上站着。',
    'highlight': '中文系是一条流动的河，老师在岸上站着'
    },,
    {
    'type': 'modern',
    'title': '夜',
    'dynasty': '现代',
    'author': '朵渔',
    'content': '夜终于来了，我在黑暗中坐着等待天亮。',
    'highlight': '夜终于来了，我在黑暗中坐着等待天亮'
    },,
    {
    'type': 'modern',
    'title': '坚持',
    'dynasty': '现代',
    'author': '郑小琼',
    'content': '我坚持在这个城市，一点一点地生锈。',
    'highlight': '我坚持在这个城市，一点一点地生锈'
    },,
    {
    'type': 'modern',
    'title': '等一个人',
    'dynasty': '现代',
    'author': '韩东',
    'content': '我等一个人，等了很多年。',
    'highlight': '我等一个人，等了很多年'
    },,
    {
    'type': 'modern',
    'title': '小春天的慷慨',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我在赤热的国土上，走了四个月去看你的坟墓。',
    'highlight': '我在赤热的国土上，走了四个月去看你的坟墓'
    },,
    {
    'type': 'modern',
    'title': '远行',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我看自己的影子，越走越远。',
    'highlight': '我看自己的影子，越走越远'
    },,
    {
    'type': 'modern',
    'title': '弧线',
    'dynasty': '现代',
    'author': '顾城',
    'content': '鸟儿在疾风中迅速转向。',
    'highlight': '鸟儿在疾风中迅速转向'
    },,
    {
    'type': 'modern',
    'title': '我是一个任性的孩子',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我是一个任性的孩子，我想在大地上画满窗子。',
    'highlight': '我是一个任性的孩子，我想在大地上画满窗子'
    },,
    {
    'type': 'modern',
    'title': '泡影',
    'dynasty': '现代',
    'author': '顾城',
    'content': '两个自由的水泡，从梦而现。',
    'highlight': '两个自由的水泡，从梦而现'
    },,
    {
    'type': 'modern',
    'title': '奠',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我把你的誓言，把戒指，给你套上。',
    'highlight': '我把你的誓言，把戒指，给你套上'
    },,
    {
    'type': 'modern',
    'title': '感觉',
    'dynasty': '现代',
    'author': '顾城',
    'content': '在一片死灰中，走过两个孩子。',
    'highlight': '在一片死灰中，走过两个孩子'
    },,
    {
    'type': 'modern',
    'title': '也许',
    'dynasty': '现代',
    'author': '顾城',
    'content': '也许我们的心事总是没有读者。',
    'highlight': '也许我们的心事总是没有读者'
    },,
    {
    'type': 'modern',
    'title': '生命狂想曲',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我的诗像一只铃铛，在风中摇晃。',
    'highlight': '我的诗像一只铃铛，在风中摇晃'
    },,
    {
    'type': 'modern',
    'title': '回家',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我回到有你的岸，你在等我。',
    'highlight': '我回到有你的岸，你在等我'
    },,
    {
    'type': 'modern',
    'title': '给我一点吧',
    'dynasty': '现代',
    'author': '顾城',
    'content': '给我一点火，让我烧掉自己。',
    'highlight': '给我一点火，让我烧掉自己'
    },,
    {
    'type': 'modern',
    'title': '秋千',
    'dynasty': '现代',
    'author': '顾城',
    'content': '小时候，我们把影子放在秋千上，飞到天上去。',
    'highlight': '小时候，我们把影子放在秋千上，飞到天上去'
    },,
    {
    'type': 'modern',
    'title': '诗是什么',
    'dynasty': '现代',
    'author': '顾城',
    'content': '诗是叶子慢慢落下的声音。',
    'highlight': '诗是叶子慢慢落下的声音'
    },,
    {
    'type': 'modern',
    'title': '春天的命令',
    'dynasty': '现代',
    'author': '顾城',
    'content': '风在阳光下吹过，草在等待，花在想。',
    'highlight': '风在阳光下吹过，草在等待，花在想'
    },,
    {
    'type': 'modern',
    'title': '早晨的花',
    'dynasty': '现代',
    'author': '顾城',
    'content': '在早晨的花丛里，有一只紫色的小甲虫。',
    'highlight': '在早晨的花丛里，有一只紫色的小甲虫'
    },,
    {
    'type': 'modern',
    'title': '黄昏',
    'dynasty': '现代',
    'author': '顾城',
    'content': '墙角的一只蟋蟀在唱秋天，它的歌声有点冷。',
    'highlight': '墙角的一只蟋蟀在唱秋天'
    },,
    {
    'type': 'modern',
    'title': '夏天',
    'dynasty': '现代',
    'author': '顾城',
    'content': '夏天的太阳把大地烤得很烫。',
    'highlight': '夏天的太阳把大地烤得很烫'
    },,
    {
    'type': 'modern',
    'title': '小小的',
    'dynasty': '现代',
    'author': '顾城',
    'content': '小小的，一只瓢虫在叶子上爬。',
    'highlight': '小小的，一只瓢虫在叶子上爬'
    },,
    {
    'type': 'modern',
    'title': '再见',
    'dynasty': '现代',
    'author': '顾城',
    'content': '你走了，像一滴水消失在海里。',
    'highlight': '你走了，像一滴水消失在海里'
    },,
    {
    'type': 'modern',
    'title': '夜行',
    'dynasty': '现代',
    'author': '顾城',
    'content': '月亮在井里，我在岸上，井水很冷，月亮很亮。',
    'highlight': '月亮在井里，我在岸上'
    },,
    {
    'type': 'modern',
    'title': '你和我',
    'dynasty': '现代',
    'author': '顾城',
    'content': '你在看我，我在看你，我们中间隔着一层玻璃。',
    'highlight': '你在看我，我在看你，我们中间隔着一层玻璃'
    },,
    {
    'type': 'modern',
    'title': '我是一条狗',
    'dynasty': '现代',
    'author': '顾城',
    'content': '我是一条很小很小很小的狗，在你的脚边跑。',
    'highlight': '我是一条很小很小很小的狗，在你的脚边跑'
    },,
    {
    'type': 'modern',
    'title': '小小的幸福',
    'dynasty': '现代',
    'author': '顾城',
    'content': '下雨了，我躲进一朵蘑菇下面。',
    'highlight': '下雨了，我躲进一朵蘑菇下面'
    },,
    {
    'type': 'modern',
    'title': '四月的黄昏',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '四月的黄昏，流曳着一组组绿色的旋律。',
    'highlight': '四月的黄昏，流曳着一组组绿色的旋律'
    },,
    {
    'type': 'modern',
    'title': '也许',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '也许溪水声里藏着你的眼睛。',
    'highlight': '也许溪水声里藏着你的眼睛'
    },,
    {
    'type': 'modern',
    'title': '初春',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '朋友，是春天了，驱散忧愁。',
    'highlight': '朋友，是春天了，驱散忧愁'
    },,
    {
    'type': 'modern',
    'title': '神女峰',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '还回到等她们去，船已经完全变了。',
    'highlight': '还回到等她们去，船已经完全变了'
    },,
    {
    'type': 'modern',
    'title': '致大海',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '也许是你，也许是，我永远也说不清。',
    'highlight': '也许是你，也许是，我永远也说不清'
    },,
    {
    'type': 'modern',
    'title': '呵，我的城市没有童话',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '我用影子在石子路上走，它比我更冷。',
    'highlight': '我用影子在石子路上走，它比我更冷'
    },,
    {
    'type': 'modern',
    'title': '礁石与灯',
    'dynasty': '现代',
    'author': '舒婷',
    'content': '也许礁石是一个没有回声的名字，而灯是你。',
    'highlight': '也许礁石是一个没有回声的名字'
    },,
    {
    'type': 'modern',
    'title': '迷途',
    'dynasty': '现代',
    'author': '北岛',
    'content': '沿着鸽子的哨音我寻找你，在蓝灰色的湖泊。',
    'highlight': '沿着鸽子的哨音我寻找你'
    },,
    {
    'type': 'modern',
    'title': '雨夜',
    'dynasty': '现代',
    'author': '北岛',
    'content': '即使明天早上枪口和血淋淋的朝霞。',
    'highlight': '即使明天早上枪口和血淋淋的朝霞'
    },,
    {
    'type': 'modern',
    'title': '红帆船',
    'dynasty': '现代',
    'author': '北岛',
    'content': '醒来，我还，在这里，摇着红帆船。',
    'highlight': '醒来，我还，在这里，摇着红帆船'
    },,
    {
    'type': 'modern',
    'title': '太阳城札记',
    'dynasty': '现代',
    'author': '北岛',
    'content': '爱情我不说，光我不说，未来我不说。',
    'highlight': '爱情我不说，光我不说'
    },,
    {
    'type': 'modern',
    'title': '无题',
    'dynasty': '现代',
    'author': '北岛',
    'content': '对于世界，我永远是个陌生人。',
    'highlight': '对于世界，我永远是个陌生人'
    },,
    {
    'type': 'modern',
    'title': '岸',
    'dynasty': '现代',
    'author': '北岛',
    'content': '陪伴着现在和以往，岸边一采花的女人把花瓣撒在水上。',
    'highlight': '陪伴着现在和以往，岸边一采花的女人'
    },,
    {
    'type': 'modern',
    'title': '回声',
    'dynasty': '现代',
    'author': '北岛',
    'content': '你走远了，而我还在这里，回声也没有了。',
    'highlight': '你走远了，而我还在这里，回声也没有了'
    },,
    {
    'type': 'modern',
    'title': '等待',
    'dynasty': '现代',
    'author': '韩东',
    'content': '我等你，在黄昏，在雨中，在所有的时刻。',
    'highlight': '我等你，在黄昏，在雨中'
    },,
    {
    'type': 'modern',
    'title': '深夜',
    'dynasty': '现代',
    'author': '韩东',
    'content': '深夜的火车轰隆驶过，我听见自己的心跳。',
    'highlight': '深夜的火车轰隆驶过，我听见自己的心跳'
    },,
    {
    'type': 'modern',
    'title': '风吹过',
    'dynasty': '现代',
    'author': '韩东',
    'content': '风吹过麦地，风吹过河流，风吹过你的脸。',
    'highlight': '风吹过麦地，风吹过河流'
    },,
    {
    'type': 'modern',
    'title': '春天',
    'dynasty': '现代',
    'author': '韩东',
    'content': '春天来了，树叶绿了，河水暖了。',
    'highlight': '春天来了，树叶绿了，河水暖了'
    },,
    {
    'type': 'modern',
    'title': '给一个人的信',
    'dynasty': '现代',
    'author': '韩东',
    'content': '我写一封信，写了十年，还没有寄出。',
    'highlight': '我写一封信，写了十年，还没有寄出'
    },,
    {
    'type': 'modern',
    'title': '雨后',
    'dynasty': '现代',
    'author': '韩东',
    'content': '雨后的街道闪着光，水洼里映着天。',
    'highlight': '雨后的街道闪着光，水洼里映着天'
    },,
    {
    'type': 'modern',
    'title': '大海',
    'dynasty': '现代',
    'author': '韩东',
    'content': '大海太大了，我们太小了。',
    'highlight': '大海太大了，我们太小了'
    },,
    {
    'type': 'modern',
    'title': '一个人的名字',
    'dynasty': '现代',
    'author': '韩东',
    'content': '你的名字，像一颗星，在很远的地方。',
    'highlight': '你的名字，像一颗星，在很远的地方'
    },,
    {
    'type': 'modern',
    'title': '火车',
    'dynasty': '现代',
    'author': '韩东',
    'content': '火车轰隆驶过站台，带走了很多东西。',
    'highlight': '火车轰隆驶过站台，带走了很多东西'
    },,
    {
    'type': 'modern',
    'title': '写信',
    'dynasty': '现代',
    'author': '韩东',
    'content': '写信是一件很慢的事，写完了，人已经变了。',
    'highlight': '写信是一件很慢的事，写完了，人已经变了'
    },,
    {
    'type': 'modern',
    'title': '父亲',
    'dynasty': '现代',
    'author': '韩东',
    'content': '父亲老了，话也少了，在院子里坐着。',
    'highlight': '父亲老了，话也少了，在院子里坐着'
    },,
    {
    'type': 'modern',
    'title': '母亲',
    'dynasty': '现代',
    'author': '韩东',
    'content': '母亲在厨房里忙碌了一辈子。',
    'highlight': '母亲在厨房里忙碌了一辈子'
    },,
    {
    'type': 'modern',
    'title': '春天',
    'dynasty': '现代',
    'author': '于坚',
    'content': '春天来了，桃花开了，杏花也开了。',
    'highlight': '春天来了，桃花开了，杏花也开了'
    },,
    {
    'type': 'modern',
    'title': '阳光',
    'dynasty': '现代',
    'author': '于坚',
    'content': '阳光照在墙上，墙就白了。',
    'highlight': '阳光照在墙上，墙就白了'
    },,
    {
    'type': 'modern',
    'title': '河流',
    'dynasty': '现代',
    'author': '于坚',
    'content': '河流向前流淌，不知道流向哪里。',
    'highlight': '河流向前流淌，不知道流向哪里'
    },,
    {
    'type': 'modern',
    'title': '秋天',
    'dynasty': '现代',
    'author': '于坚',
    'content': '秋天的叶子落了一地，踩上去沙沙响。',
    'highlight': '秋天的叶子落了一地，踩上去沙沙响'
    },,
    {
    'type': 'modern',
    'title': '夜晚',
    'dynasty': '现代',
    'author': '于坚',
    'content': '夜晚的城市像一个巨大的蜂巢。',
    'highlight': '夜晚的城市像一个巨大的蜂巢'
    },,
    {
    'type': 'modern',
    'title': '火车',
    'dynasty': '现代',
    'author': '于坚',
    'content': '火车穿过平原，穿过山洞，穿过黑夜。',
    'highlight': '火车穿过平原，穿过山洞，穿过黑夜'
    },,
    {
    'type': 'modern',
    'title': '地铁',
    'dynasty': '现代',
    'author': '于坚',
    'content': '地铁在地下飞驰，人们面无表情。',
    'highlight': '地铁在地下飞驰，人们面无表情'
    },,
    {
    'type': 'modern',
    'title': '大海',
    'dynasty': '现代',
    'author': '于坚',
    'content': '大海在远方，我在这边。',
    'highlight': '大海在远方，我在这边'
    },,
    {
    'type': 'modern',
    'title': '落日',
    'dynasty': '现代',
    'author': '于坚',
    'content': '落日像一个巨大的句号，结束了白天。',
    'highlight': '落日像一个巨大的句号，结束了白天'
    },,
    {
    'type': 'modern',
    'title': '星星',
    'dynasty': '现代',
    'author': '于坚',
    'content': '星星在天上，亮了很久了。',
    'highlight': '星星在天上，亮了很久了'
    },,
    {
    'type': 'modern',
    'title': '树',
    'dynasty': '现代',
    'author': '于坚',
    'content': '一棵树站在路边，一站就是很多年。',
    'highlight': '一棵树站在路边，一站就是很多年'
    },,
    {
    'type': 'modern',
    'title': '鸟',
    'dynasty': '现代',
    'author': '于坚',
    'content': '鸟从天空飞过，留下一道影。',
    'highlight': '鸟从天空飞过，留下一道影'
    },,
    {
    'type': 'modern',
    'title': '风',
    'dynasty': '现代',
    'author': '于坚',
    'content': '风来了，风走了，什么也没有留下。',
    'highlight': '风来了，风走了，什么也没有留下'
    },,
    {
    'type': 'modern',
    'title': '雨',
    'dynasty': '现代',
    'author': '于坚',
    'content': '雨落在屋顶上，滴滴答答。',
    'highlight': '雨落在屋顶上，滴滴答答'
    },,
    {
    'type': 'modern',
    'title': '雪',
    'dynasty': '现代',
    'author': '于坚',
    'content': '雪落下来了，世界安静了。',
    'highlight': '雪落下来了，世界安静了'
    },,
    {
    'type': 'modern',
    'title': '夜行火车',
    'dynasty': '现代',
    'author': '余怒',
    'content': '夜行火车穿过田野，穿过村庄，穿过黑夜。',
    'highlight': '夜行火车穿过田野，穿过村庄，穿过黑夜'
    },,
    {
    'type': 'modern',
    'title': '写信',
    'dynasty': '现代',
    'author': '余怒',
    'content': '给你写一封信，写了一半就停了。',
    'highlight': '给你写一封信，写了一半就停了'
    },,
    {
    'type': 'modern',
    'title': '灯',
    'dynasty': '现代',
    'author': '余怒',
    'content': '灯在夜里亮着，照着回家的路。',
    'highlight': '灯在夜里亮着，照着回家的路'
    },,
    {
    'type': 'modern',
    'title': '远方',
    'dynasty': '现代',
    'author': '余怒',
    'content': '远方有山，有水，有我们到不了的地方。',
    'highlight': '远方有山，有水，有我们到不了的地方'
    },,
    {
    'type': 'modern',
    'title': '大海',
    'dynasty': '现代',
    'author': '余怒',
    'content': '大海太大了，装得下所有的眼泪。',
    'highlight': '大海太大了，装得下所有的眼泪'
    },,
    {
    'type': 'modern',
    'title': '火车',
    'dynasty': '现代',
    'author': '小安',
    'content': '火车轰隆轰隆地开过来，又轰隆轰隆地开走了。',
    'highlight': '火车轰隆轰隆地开过来，又轰隆轰隆地开走了'
    },,
    {
    'type': 'modern',
    'title': '写信',
    'dynasty': '现代',
    'author': '小安',
    'content': '我想给你写一封信，写在纸上，寄出去。',
    'highlight': '我想给你写一封信，写在纸上，寄出去'
    },,
    {
    'type': 'modern',
    'title': '等',
    'dynasty': '现代',
    'author': '小安',
    'content': '等了很久，等来了风，等来了雨，没有等来你。',
    'highlight': '等了很久，等来了风，等来了雨，没有等来你'
    },,
    {
    'type': 'modern',
    'title': '夜',
    'dynasty': '现代',
    'author': '小安',
    'content': '夜里很静，能听见自己的呼吸。',
    'highlight': '夜里很静，能听见自己的呼吸'
    },,
    {
    'type': 'modern',
    'title': '火车',
    'dynasty': '现代',
    'author': '沈浩波',
    'content': '火车向前开去，把站台留在身后。',
    'highlight': '火车向前开去，把站台留在身后'
    },,
    {
    'type': 'modern',
    'title': '春天',
    'dynasty': '现代',
    'author': '沈浩波',
    'content': '春天的风，吹在脸上，很舒服。',
    'highlight': '春天的风，吹在脸上，很舒服'
    },,
    {
    'type': 'modern',
    'title': '父亲',
    'dynasty': '现代',
    'author': '沈浩波',
    'content': '父亲老了，背也有点驼了。',
    'highlight': '父亲老了，背也有点驼了'
    },,
    {
    'type': 'modern',
    'title': '母亲',
    'dynasty': '现代',
    'author': '沈浩波',
    'content': '母亲站在门口，望着远方。',
    'highlight': '母亲站在门口，望着远方'
    },,
    {
    'type': 'modern',
    'title': '夜晚的火车',
    'dynasty': '现代',
    'author': '朵渔',
    'content': '夜晚的火车穿过华北平原。',
    'highlight': '夜晚的火车穿过华北平原'
    },,
    {
    'type': 'modern',
    'title': '在黑暗中',
    'dynasty': '现代',
    'author': '朵渔',
    'content': '在黑暗中，我听到自己的心跳。',
    'highlight': '在黑暗中，我听到自己的心跳'
    },,
    {
    'type': 'modern',
    'title': '写信',
    'dynasty': '现代',
    'author': '朵渔',
    'content': '给你写信，写完了不知道该寄向哪里。',
    'highlight': '给你写信，写完了不知道该寄向哪里'
    },,
    {
    'type': 'modern',
    'title': '夜晚',
    'dynasty': '现代',
    'author': '朵渔',
    'content': '夜晚很长，够想很多事情。',
    'highlight': '夜晚很长，够想很多事情'
    },,
    {
    'type': 'modern',
    'title': '火车',
    'dynasty': '现代',
    'author': '郑小琼',
    'content': '火车经过东莞的时候，我看见了大海。',
    'highlight': '火车经过东莞的时候，我看见了大海'
    },,
    {
    'type': 'modern',
    'title': '流水线',
    'dynasty': '现代',
    'author': '郑小琼',
    'content': '流水线在转，我们的手也在转。',
    'highlight': '流水线在转，我们的手也在转'
    },,
    {
    'type': 'modern',
    'title': '打工者',
    'dynasty': '现代',
    'author': '郑小琼',
    'content': '我们从农村来，到城市里去。',
    'highlight': '我们从农村来，到城市里去'
    },,
    {
    'type': 'modern',
    'title': '铁',
    'dynasty': '现代',
    'author': '郑小琼',
    'content': '铁是冷的，我们的心是热的。',
    'highlight': '铁是冷的，我们的心是热的'
    },,
    {
    'type': 'modern',
    'title': '诗',
    'dynasty': '现代',
    'author': '宋晓贤',
    'content': '诗是什么，诗是敲门的声音。',
    'highlight': '诗是什么，诗是敲门的声音'
    },,
    {
    'type': 'modern',
    'title': '火车票',
    'dynasty': '现代',
    'author': '宋晓贤',
    'content': '我有一张火车票，起点是家，终点是远方。',
    'highlight': '我有一张火车票，起点是家，终点是远方'
    },,
    {
    'type': 'modern',
    'title': '春天',
    'dynasty': '现代',
    'author': '宋晓贤',
    'content': '春天来了，花开了，燕子在飞。',
    'highlight': '春天来了，花开了，燕子在飞'
    },,
    {
    'type': 'modern',
    'title': '远行',
    'dynasty': '现代',
    'author': '宋晓贤',
    'content': '我要远行了，背上行囊，走向未知。',
    'highlight': '我要远行了，背上行囊，走向未知'
    },,
    {
    'type': 'modern',
    'title': '写信',
    'dynasty': '现代',
    'author': '宋晓贤',
    'content': '写一封信，写下我的思念，寄给远方的人。',
    'highlight': '写一封信，写下我的思念，寄给远方的人'
    },,
    {
    'type': 'modern',
    'title': '火车',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '火车在铁轨上飞奔，像一首奔跑的诗。',
    'highlight': '火车在铁轨上飞奔，像一首奔跑的诗'
    },,
    {
    'type': 'modern',
    'title': '康桥',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '那河畔的金柳，是夕阳中的新娘。',
    'highlight': '那河畔的金柳，是夕阳中的新娘'
    },,
    {
    'type': 'modern',
    'title': '再别',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '悄悄的我走了，正如我悄悄的来。',
    'highlight': '悄悄的我走了，正如我悄悄的来'
    },,
    {
    'type': 'modern',
    'title': '黄鹂',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '黄鹂鸣翠柳，白鹭上青天。',
    'highlight': '黄鹂鸣翠柳，白鹭上青天'
    },,
    {
    'type': 'modern',
    'title': '春',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '春光在山间流转，像一首流动的诗。',
    'highlight': '春光在山间流转，像一首流动的诗'
    },,
    {
    'type': 'modern',
    'title': '落叶',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '落叶在风中飘，像一只只蝴蝶。',
    'highlight': '落叶在风中飘，像一只只蝴蝶'
    },,
    {
    'type': 'modern',
    'title': '深夜的乐声',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '这深夜的乐声，是你的手指在弹奏吗？',
    'highlight': '这深夜的乐声，是你的手指在弹奏吗'
    },,
    {
    'type': 'modern',
    'title': '偶然',
    'dynasty': '现代',
    'author': '徐志摩',
    'content': '你有你的，我有我的，方向。',
    'highlight': '你有你的，我有我的，方向'
    },,
    {
    'type': 'modern',
    'title': '火车记',
    'dynasty': '现代',
    'author': '韩东',
    'content': '火车开走的时候，我没有哭。',
    'highlight': '火车开走的时候，我没有哭'
    },,
    {
    'type': 'modern',
    'title': '秋天记',
    'dynasty': '现代',
    'author': '韩东',
    'content': '秋天到了，叶子就落了。',
    'highlight': '秋天到了，叶子就落了'
    },,
    {
    'type': 'modern',
    'title': '春天记',
    'dynasty': '现代',
    'author': '韩东',
    'content': '春天来了，花就开了。',
    'highlight': '春天来了，花就开了'
    },,
    {
    'type': 'modern',
    'title': '夏天记',
    'dynasty': '现代',
    'author': '韩东',
    'content': '夏天很热，我们躲在树下。',
    'highlight': '夏天很热，我们躲在树下'
    },,
    {
    'type': 'modern',
    'title': '冬天记',
    'dynasty': '现代',
    'author': '韩东',
    'content': '冬天很冷，我们挤在一起。',
    'highlight': '冬天很冷，我们挤在一起'
    },,
    {
    'type': 'modern',
    'title': '海',
    'dynasty': '现代',
    'author': '韩东',
    'content': '海很大，一眼望不到边。',
    'highlight': '海很大，一眼望不到边'
    },,
    {
    'type': 'modern',
    'title': '山',
    'dynasty': '现代',
    'author': '韩东',
    'content': '山很高，爬上去要很久。',
    'highlight': '山很高，爬上去要很久'
    },,
    {
    'type': 'modern',
    'title': '河',
    'dynasty': '现代',
    'author': '韩东',
    'content': '河水在流，流向大海。',
    'highlight': '河水在流，流向大海'
    },,
    {
    'type': 'modern',
    'title': '路',
    'dynasty': '现代',
    'author': '韩东',
    'content': '路很长，我们一起走。',
    'highlight': '路很长，我们一起走'
    },,
    {
    'type': 'modern',
    'title': '家',
    'dynasty': '现代',
    'author': '韩东',
    'content': '家是一个方向，你走多远都会回来的方向。',
    'highlight': '家是一个方向，你走多远都会回来的方向'
    },,
    {
    'type': 'modern',
    'title': '夜火车',
    'dynasty': '现代',
    'author': '于坚',
    'content': '夜火车在黑暗中穿行，轰隆隆的，像雷。',
    'highlight': '夜火车在黑暗中穿行，轰隆隆的，像雷'
    },,
    {
    'type': 'modern',
    'title': '秋日',
    'dynasty': '现代',
    'author': '于坚',
    'content': '秋日的光落在墙上，墙就暖了。',
    'highlight': '秋日的光落在墙上，墙就暖了'
    },,
    {
    'type': 'modern',
    'title': '春晨',
    'dynasty': '现代',
    'author': '于坚',
    'content': '春晨的雾散得很慢，像一匹布。',
    'highlight': '春晨的雾散得很慢，像一匹布'
    },,
    {
    'type': 'modern',
    'title': '夏天',
    'dynasty': '现代',
    'author': '于坚',
    'content': '夏天的雨来得快，去得也快。',
    'highlight': '夏天的雨来得快，去得也快'
    },,
    {
    'type': 'modern',
    'title': '冬夜',
    'dynasty': '现代',
    'author': '于坚',
    'content': '冬夜很长，够读完一本书。',
    'highlight': '冬夜很长，够读完一本书'
    },,
    {
    'type': 'modern',
    'title': '写信',
    'dynasty': '现代',
    'author': '于坚',
    'content': '给你写信，写了三行就停了。',
    'highlight': '给你写信，写了三行就停了'
    },,
    {
    'type': 'modern',
    'title': '电话',
    'dynasty': '现代',
    'author': '于坚',
    'content': '电话里只有沉默，和一些杂音。',
    'highlight': '电话里只有沉默，和一些杂音'
    },,
    {
    'type': 'modern',
    'title': '电脑',
    'dynasty': '现代',
    'author': '于坚',
    'content': '电脑屏幕亮着，你的头像在那里。',
    'highlight': '电脑屏幕亮着，你的头像在那里'
    },,
    {
    'type': 'modern',
    'title': '城市',
    'dynasty': '现代',
    'author': '于坚',
    'content': '城市很大，人很多，我只有一个人。',
    'highlight': '城市很大，人很多，我只有一个人'
    },,
    {
    'type': 'modern',
    'title': '乡村',
    'dynasty': '现代',
    'author': '于坚',
    'content': '乡村很小，天很蓝，水很清。',
    'highlight': '乡村很小，天很蓝，水很清'
    },,
    {
    'type': 'foreign',
    'title': '十四行诗 18',
    'dynasty': '英',
    'author': '莎士比亚（译）',
    'content': '我可否将你比作夏日？你比夏日更可爱，更温婉。',
    'highlight': '我可否将你比作夏日？你比夏日更可爱，更温婉'
    },,
    {
    'type': 'foreign',
    'title': '十四行诗 116',
    'dynasty': '英',
    'author': '莎士比亚（译）',
    'content': '爱不是真爱，如果一个人变心，爱就随之消逝。',
    'highlight': '爱不是真爱，如果一个人变心，爱就随之消逝'
    },,
    {
    'type': 'foreign',
    'title': '十四行诗 29',
    'dynasty': '英',
    'author': '莎士比亚（译）',
    'content': '当我受尽命运和人们的冷眼，我悄悄走开。',
    'highlight': '当我受尽命运和人们的冷眼，我悄悄走开'
    },,
    {
    'type': 'foreign',
    'title': '当你老了',
    'dynasty': '爱尔兰',
    'author': '叶芝（译）',
    'content': '当你老了，头白了，睡意昏沉，\n炉火旁打盹，请取下这部诗歌。',
    'highlight': '当你老了，头白了，睡意昏沉'
    },,
    {
    'type': 'foreign',
    'title': '致他的爱情',
    'dynasty': '爱尔兰',
    'author': '叶芝（译）',
    'content': '有一群鸽子在一棵树上，当它们飞起，\n雪白的翅膀像波浪一样展开。',
    'highlight': '有一群鸽子在一棵树上，当它们飞起'
    },,
    {
    'type': 'foreign',
    'title': '世界上最远的距离',
    'dynasty': '印度',
    'author': '泰戈尔（译）',
    'content': '世界上最远的距离，不是生与死的距离，\n而是我站在你面前，你不知道我爱你。',
    'highlight': '世界上最远的距离，不是生与死的距离'
    },,
    {
    'type': 'foreign',
    'title': '飞鸟集 6',
    'dynasty': '印度',
    'author': '泰戈尔（译）',
    'content': '世界以痛吻我，要我报之以歌。',
    'highlight': '世界以痛吻我，要我报之以歌'
    },,
    {
    'type': 'foreign',
    'title': '生如夏花',
    'dynasty': '印度',
    'author': '泰戈尔（译）',
    'content': '生如夏花之绚烂，死如秋叶之静美。',
    'highlight': '生如夏花之绚烂，死如秋叶之静美'
    },,
    {
    'type': 'foreign',
    'title': '飞鸟集 32',
    'dynasty': '印度',
    'author': '泰戈尔（译）',
    'content': '光明如一个裸体的孩子，快活地，在绿叶中间游戏。',
    'highlight': '光明如一个裸体的孩子，快活地，在绿叶中间游戏'
    },,
    {
    'type': 'foreign',
    'title': '飞鸟集 257',
    'dynasty': '印度',
    'author': '泰戈尔（译）',
    'content': '我存在，乃是所谓生命的一个永久的奇迹。',
    'highlight': '我存在，乃是所谓生命的一个永久的奇迹'
    },,
    {
    'type': 'foreign',
    'title': '吉檀迦利 1',
    'dynasty': '印度',
    'author': '泰戈尔（译）',
    'content': '你让我的生命远离了你，我的心因渴望而痛。',
    'highlight': '你让我的生命远离了你，我的心因渴望而痛'
    },,
    {
    'type': 'foreign',
    'title': '天真的预言',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '一沙一世界，一花一天堂。掌中握无限，刹那即永恒。',
    'highlight': '一沙一世界，一花一天堂'
    },,
    {
    'type': 'foreign',
    'title': '老虎',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '老虎！老虎！明亮如火，在森林中闪烁。',
    'highlight': '老虎！老虎！明亮如火，在森林中闪烁'
    },,
    {
    'type': 'foreign',
    'title': '欢乐与忧惧',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '一哭一笑，一沙一世界，一树一菩提。',
    'highlight': '一哭一笑，一沙一世界，一树一菩提'
    },,
    {
    'type': 'foreign',
    'title': '西风颂',
    'dynasty': '英',
    'author': '雪莱（译）',
    'content': '如果冬天来了，春天还会远吗？',
    'highlight': '如果冬天来了，春天还会远吗'
    },,
    {
    'type': 'foreign',
    'title': '致云雀',
    'dynasty': '英',
    'author': '雪莱（译）',
    'content': '歌唱吧，云雀！为了欢乐而歌唱！',
    'highlight': '歌唱吧，云雀！为了欢乐而歌唱'
    },,
    {
    'type': 'foreign',
    'title': '雾中羊',
    'dynasty': '英',
    'author': '雪莱（译）',
    'content': '山峦在云中沉睡，羊群在雾中行走。',
    'highlight': '山峦在云中沉睡，羊群在雾中行走'
    },,
    {
    'type': 'foreign',
    'title': '啊，活着，活着',
    'dynasty': '英',
    'author': '雪莱（译）',
    'content': '活着，活着，不要让心中的火焰熄灭。',
    'highlight': '活着，活着，不要让心中的火焰熄灭'
    },,
    {
    'type': 'foreign',
    'title': '无常',
    'dynasty': '英',
    'author': '雪莱（译）',
    'content': '明天的新芽和昨天的枯叶，都在风中飘零。',
    'highlight': '明天的新芽和昨天的枯叶，都在风中飘零'
    },,
    {
    'type': 'foreign',
    'title': '音乐',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '美即是真，真即是美——这就是你们在世上所知道的一切。',
    'highlight': '美即是真，真即是美'
    },,
    {
    'type': 'foreign',
    'title': '夜莺颂',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '我的心在痛，一阵麻木的痛楚渗入感官。',
    'highlight': '我的心在痛，一阵麻木的痛楚渗入感官'
    },,
    {
    'type': 'foreign',
    'title': '希腊古瓮颂',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '美即是真，真即是美，这就是你们在世上所需知道的一切。',
    'highlight': '美即是真，真即是美，这就是你们在世上所需知道的一切'
    },,
    {
    'type': 'foreign',
    'title': '秋颂',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '雾气缭绕，硕果累累的秋天，满是成熟和满足。',
    'highlight': '雾气缭绕，硕果累累的秋天，满是成熟和满足'
    },,
    {
    'type': 'foreign',
    'title': '初读贾浦曼有感',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '我感到了某种东西，像是我心中升起的一阵甜蜜的骚动。',
    'highlight': '我感到了某种东西，像是我心中升起的一阵甜蜜的骚动'
    },,
    {
    'type': 'foreign',
    'title': '致拜伦',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '你的诗像一只夜莺，在夜晚歌唱。',
    'highlight': '你的诗像一只夜莺，在夜晚歌唱'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '我的心像一只疲倦的鸟，在笼中等待黎明。',
    'highlight': '我的心像一只疲倦的鸟，在笼中等待黎明'
    },,
    {
    'type': 'foreign',
    'title': '在诗歌中',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '在诗歌中，我找到了一个永恒的世界。',
    'highlight': '在诗歌中，我找到了一个永恒的世界'
    },,
    {
    'type': 'foreign',
    'title': '秋日',
    'dynasty': '奥地利',
    'author': '里尔克（译）',
    'content': '谁此时没有房子，就不必建造。',
    'highlight': '谁此时没有房子，就不必建造'
    },,
    {
    'type': 'foreign',
    'title': '预感',
    'dynasty': '奥地利',
    'author': '里尔克（译）',
    'content': '我像一面旗帜被空旷包围。',
    'highlight': '我像一面旗帜被空旷包围'
    },,
    {
    'type': 'foreign',
    'title': '黑猫',
    'dynasty': '奥地利',
    'author': '里尔克（译）',
    'content': '在夜里，一切动物都比白天更真实。',
    'highlight': '在夜里，一切动物都比白天更真实'
    },,
    {
    'type': 'foreign',
    'title': '总是一再地',
    'dynasty': '奥地利',
    'author': '里尔克（译）',
    'content': '总是一再地，我们不得不回到孤独中。',
    'highlight': '总是一再地，我们不得不回到孤独中'
    },,
    {
    'type': 'foreign',
    'title': '在黑暗中',
    'dynasty': '奥地利',
    'author': '里尔克（译）',
    'content': '在黑暗中，我更容易看清事物的轮廓。',
    'highlight': '在黑暗中，我更容易看清事物的轮廓'
    },,
    {
    'type': 'foreign',
    'title': '面朝大海',
    'dynasty': '德',
    'author': '荷尔德林（译）',
    'content': '人生充满劳绩，但诗意地，人栖居在这片大地之上。',
    'highlight': '人生充满劳绩，但诗意地，人栖居在这片大地之上'
    },,
    {
    'type': 'foreign',
    'title': '橡树',
    'dynasty': '德',
    'author': '荷尔德林（译）',
    'content': '在森林中，有一棵橡树，它在风中站立了很久。',
    'highlight': '在森林中，有一棵橡树，它在风中站立了很久'
    },,
    {
    'type': 'foreign',
    'title': '怀念',
    'dynasty': '德',
    'author': '荷尔德林（译）',
    'content': '那里有许多美丽的地方，但最美丽的是故乡。',
    'highlight': '那里有许多美丽的地方，但最美丽的是故乡'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '德',
    'author': '荷尔德林（译）',
    'content': '夜晚像一条黑色的河流，流过沉睡的大地。',
    'highlight': '夜晚像一条黑色的河流，流过沉睡的大地'
    },,
    {
    'type': 'foreign',
    'title': '致德国人',
    'dynasty': '德',
    'author': '荷尔德林（译）',
    'content': '不要在错误的路上走得太远。',
    'highlight': '不要在错误的路上走得太远'
    },,
    {
    'type': 'foreign',
    'title': '啊，朋友',
    'dynasty': '德',
    'author': '荷尔德林（译）',
    'content': '啊，朋友，让我们保持清醒，保持我们的信仰。',
    'highlight': '啊，朋友，让我们保持清醒，保持我们的信仰'
    },,
    {
    'type': 'foreign',
    'title': '奥德赛',
    'dynasty': '古罗马',
    'author': '荷马（译）',
    'content': '家，是心的归属，无论走多远。',
    'highlight': '家，是心的归属，无论走多远'
    },,
    {
    'type': 'foreign',
    'title': '夜莺',
    'dynasty': '古罗马',
    'author': '维吉尔（译）',
    'content': '夜莺在夜色中歌唱，歌声穿过树林。',
    'highlight': '夜莺在夜色中歌唱，歌声穿过树林'
    },,
    {
    'type': 'foreign',
    'title': '礼物',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '如此幸福的一天，雾一早就散了，我在花园里干活。',
    'highlight': '如此幸福的一天，雾一早就散了，我在花园里干活'
    },,
    {
    'type': 'foreign',
    'title': '一见钟情',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '他们两人都相信，是瞬间爆发的情感让他们相遇。',
    'highlight': '他们两人都相信，是瞬间爆发的情感让他们相遇'
    },,
    {
    'type': 'foreign',
    'title': '种种可能',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '我偏爱写诗的荒谬，胜过不写诗的荒谬。',
    'highlight': '我偏爱写诗的荒谬，胜过不写诗的荒谬'
    },,
    {
    'type': 'foreign',
    'title': '三个最奇怪的词',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '当我说\'未来\'这个词，第一音节已成了过去。',
    'highlight': '当我说\'未来\'这个词，第一音节已成了过去'
    },,
    {
    'type': 'foreign',
    'title': '写作的喜悦',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '写作的喜悦是保存的力量。',
    'highlight': '写作的喜悦是保存的力量'
    },,
    {
    'type': 'foreign',
    'title': '博物馆',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '这里有什么值得一看的？一切——因为一切都会消失。',
    'highlight': '这里有什么值得一看的？一切——因为一切都会消失'
    },,
    {
    'type': 'foreign',
    'title': '景致',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '山上树木，山下山谷，都有它们存在的理由。',
    'highlight': '山上树木，山下山谷，都有它们存在的理由'
    },,
    {
    'type': 'foreign',
    'title': '越南',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '她叫美莱，她十四岁，在战争中死去。',
    'highlight': '她叫美莱，她十四岁，在战争中死去'
    },,
    {
    'type': 'foreign',
    'title': '履历',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '我只是一个地名，在某个人的履历表上。',
    'highlight': '我只是一个地名，在某个人的履历表上'
    },,
    {
    'type': 'foreign',
    'title': '火车',
    'dynasty': '波兰',
    'author': '辛波斯卡（译）',
    'content': '火车在原野上飞驰，窗外的风景一闪而过。',
    'highlight': '火车在原野上飞驰，窗外的风景一闪而过'
    },,
    {
    'type': 'foreign',
    'title': '雪',
    'dynasty': '土耳其',
    'author': '塔朗吉（译）',
    'content': '去什么地方呢？这么晚了，美丽的火车，孤独的火车？',
    'highlight': '去什么地方呢？这么晚了，美丽的火车，孤独的火车'
    },,
    {
    'type': 'foreign',
    'title': '今天',
    'dynasty': '土耳其',
    'author': '塔朗吉（译）',
    'content': '今天，我只想静静地坐着，和你在一起。',
    'highlight': '今天，我只想静静地坐着，和你在一起'
    },,
    {
    'type': 'foreign',
    'title': '火车',
    'dynasty': '土耳其',
    'author': '塔朗吉（译）',
    'content': '火车载着人们，从一个地方到另一个地方。',
    'highlight': '火车载着人们，从一个地方到另一个地方'
    },,
    {
    'type': 'foreign',
    'title': '春天',
    'dynasty': '土耳其',
    'author': '塔朗吉（译）',
    'content': '春天来了，花都开了，世界变美了。',
    'highlight': '春天来了，花都开了，世界变美了'
    },,
    {
    'type': 'foreign',
    'title': '海',
    'dynasty': '土耳其',
    'author': '塔朗吉（译）',
    'content': '海很大，海很蓝，海能容纳所有的眼泪。',
    'highlight': '海很大，海很蓝，海能容纳所有的眼泪'
    },,
    {
    'type': 'foreign',
    'title': '雪',
    'dynasty': '俄',
    'author': '丘特切夫（译）',
    'content': '别以为，春天只是季节，它是灵魂的苏醒。',
    'highlight': '别以为，春天只是季节，它是灵魂的苏醒'
    },,
    {
    'type': 'foreign',
    'title': '在森林中沉睡',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '金黄的落叶翻飞，在秋日的森林里，我沉沉睡去。',
    'highlight': '金黄的落叶翻飞，在秋日的森林里，我沉沉睡去'
    },,
    {
    'type': 'foreign',
    'title': '我记得',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '我记得，那金色的秋季，那第一声霜。',
    'highlight': '我记得，那金色的秋季，那第一声霜'
    },,
    {
    'type': 'foreign',
    'title': '母牛',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '可爱的母牛在牧场上，沐浴着月光。',
    'highlight': '可爱的母牛在牧场上，沐浴着月光'
    },,
    {
    'type': 'foreign',
    'title': '再见了，我的朋友',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '再见了，我的朋友，不要悲伤，我会记得一切。',
    'highlight': '再见了，我的朋友，不要悲伤，我会记得一切'
    },,
    {
    'type': 'foreign',
    'title': '黑麦',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '黑麦在田野里摇晃，像一片金色的海。',
    'highlight': '黑麦在田野里摇晃，像一片金色的海'
    },,
    {
    'type': 'foreign',
    'title': '四行诗',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '在这世上，死并不新鲜，可是活着，当然也不更新奇。',
    'highlight': '在这世上，死并不新鲜，可是活着，当然也不更新奇'
    },,
    {
    'type': 'foreign',
    'title': '给母亲的信',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '母亲，我过得很不好，但不要担心。',
    'highlight': '母亲，我过得很不好，但不要担心'
    },,
    {
    'type': 'foreign',
    'title': '我不为你惋惜',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '我不为你惋惜，蝴蝶和花朵也不惋惜你。',
    'highlight': '我不为你惋惜，蝴蝶和花朵也不惋惜你'
    },,
    {
    'type': 'foreign',
    'title': '春天的河流',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '春天的河流解冻了，水在流动。',
    'highlight': '春天的河流解冻了，水在流动'
    },,
    {
    'type': 'foreign',
    'title': '我爱',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '我爱我脚下这片土地，爱它的每一寸尘土。',
    'highlight': '我爱我脚下这片土地，爱它的每一寸尘土'
    },,
    {
    'type': 'foreign',
    'title': '我曾经满世界地走',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '我曾经满世界地走，现在只想回家。',
    'highlight': '我曾经满世界地走，现在只想回家'
    },,
    {
    'type': 'foreign',
    'title': '我爱过',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '我爱过，我曾经爱过，这就是一切。',
    'highlight': '我爱过，我曾经爱过，这就是一切'
    },,
    {
    'type': 'foreign',
    'title': '夜幕下',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '夜幕下的大地很静，只有风在吹。',
    'highlight': '夜幕下的大地很静，只有风在吹'
    },,
    {
    'type': 'foreign',
    'title': '田野',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '田野很宽，天空很蓝，我们在那里奔跑。',
    'highlight': '田野很宽，天空很蓝，我们在那里奔跑'
    },,
    {
    'type': 'foreign',
    'title': '月亮',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '月亮升起来了，照亮了整个村庄。',
    'highlight': '月亮升起来了，照亮了整个村庄'
    },,
    {
    'type': 'foreign',
    'title': '孤独',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '我一个人站在田野里，风吹过我的脸。',
    'highlight': '我一个人站在田野里，风吹过我的脸'
    },,
    {
    'type': 'foreign',
    'title': '大海',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '大海在远方，我站在岸边，看着波浪。',
    'highlight': '大海在远方，我站在岸边，看着波浪'
    },,
    {
    'type': 'foreign',
    'title': '黎明',
    'dynasty': '俄',
    'author': '叶赛宁（译）',
    'content': '黎明来了，天边有一线光。',
    'highlight': '黎明来了，天边有一线光'
    },,
    {
    'type': 'foreign',
    'title': '夜莺',
    'dynasty': '俄',
    'author': '丘特切夫（译）',
    'content': '夜莺在夜晚歌唱，歌声在树林里回荡。',
    'highlight': '夜莺在夜晚歌唱，歌声在树林里回荡'
    },,
    {
    'type': 'foreign',
    'title': '傍晚',
    'dynasty': '俄',
    'author': '丘特切夫（译）',
    'content': '傍晚的光很柔和，像一条金色的河流。',
    'highlight': '傍晚的光很柔和，像一条金色的河流'
    },,
    {
    'type': 'foreign',
    'title': '春',
    'dynasty': '俄',
    'author': '丘特切夫（译）',
    'content': '春天来了，一切都重新开始。',
    'highlight': '春天来了，一切都重新开始'
    },,
    {
    'type': 'foreign',
    'title': '大海',
    'dynasty': '俄',
    'author': '普希金（译）',
    'content': '我爱大海，因为它的浪花像自由的呼喊。',
    'highlight': '我爱大海，因为它的浪花像自由的呼喊'
    },,
    {
    'type': 'foreign',
    'title': '假如生活欺骗了你',
    'dynasty': '俄',
    'author': '普希金（译）',
    'content': '假如生活欺骗了你，不要悲伤，不要心急！',
    'highlight': '假如生活欺骗了你，不要悲伤，不要心急'
    },,
    {
    'type': 'foreign',
    'title': '致凯恩',
    'dynasty': '俄',
    'author': '普希金（译）',
    'content': '我记得那美妙的瞬间，你出现在我的面前。',
    'highlight': '我记得那美妙的瞬间，你出现在我的面前'
    },,
    {
    'type': 'foreign',
    'title': '一朵花',
    'dynasty': '俄',
    'author': '屠格涅夫（译）',
    'content': '我在林中散步，捡到一朵花，它已经枯萎了。',
    'highlight': '我在林中散步，捡到一朵花，它已经枯萎了'
    },,
    {
    'type': 'foreign',
    'title': '门槛',
    'dynasty': '俄',
    'author': '屠格涅夫（译）',
    'content': '我看见一座高高的门槛，站在那里，不知道该不该跨过去。',
    'highlight': '我看见一座高高的门槛，站在那里，不知道该不该跨过去'
    },,
    {
    'type': 'foreign',
    'title': '门槛',
    'dynasty': '俄',
    'author': '萨申（译）',
    'content': '门槛里面是未知的未来，门槛外面是已知的过去。',
    'highlight': '门槛里面是未知的未来，门槛外面是已知的过去'
    },,
    {
    'type': 'foreign',
    'title': '门槛',
    'dynasty': '俄',
    'author': '帕斯捷尔纳克（译）',
    'content': '门槛在面前，门在身后，一切都是选择。',
    'highlight': '门槛在面前，门在身后，一切都是选择'
    },,
    {
    'type': 'foreign',
    'title': '门槛',
    'dynasty': '俄',
    'author': '阿赫玛托娃（译）',
    'content': '我站在门槛上，望着远方，等待着什么。',
    'highlight': '我站在门槛上，望着远方，等待着什么'
    },,
    {
    'type': 'foreign',
    'title': '最后一次相见',
    'dynasty': '俄',
    'author': '阿赫玛托娃（译）',
    'content': '那次相见像一把刀，把我的心切成两半。',
    'highlight': '那次相见像一把刀，把我的心切成两半'
    },,
    {
    'type': 'foreign',
    'title': '安魂曲',
    'dynasty': '俄',
    'author': '阿赫玛托娃（译）',
    'content': '在那些可怕的年代，我陪伴着被埋葬的人们。',
    'highlight': '在那些可怕的年代，我陪伴着被埋葬的人们'
    },,
    {
    'type': 'foreign',
    'title': '我与你',
    'dynasty': '俄',
    'author': '阿赫玛托娃（译）',
    'content': '我与你，我们两个，像两条平行的线。',
    'highlight': '我与你，我们两个，像两条平行的线'
    },,
    {
    'type': 'foreign',
    'title': '无题',
    'dynasty': '俄',
    'author': '阿赫玛托娃（译）',
    'content': '我知道，我知道，你是我心中的星星。',
    'highlight': '我知道，我知道，你是我心中的星星'
    },,
    {
    'type': 'foreign',
    'title': '诗',
    'dynasty': '俄',
    'author': '曼德尔施塔姆（译）',
    'content': '在世界上，声音会消失，但诗歌不会。',
    'highlight': '在世界上，声音会消失，但诗歌不会'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '俄',
    'author': '勃洛克（译）',
    'content': '夜很黑，街道很静，我一个人走着。',
    'highlight': '夜很黑，街道很静，我一个人走着'
    },,
    {
    'type': 'foreign',
    'title': '晨',
    'dynasty': '俄',
    'author': '勃洛克（译）',
    'content': '晨光照进窗户，新的一天开始了。',
    'highlight': '晨光照进窗户，新的一天开始了'
    },,
    {
    'type': 'foreign',
    'title': '致安娜',
    'dynasty': '俄',
    'author': '勃洛克（译）',
    'content': '你是我心中的光，照亮了我所有的黑夜。',
    'highlight': '你是我心中的光，照亮了我所有的黑夜'
    },,
    {
    'type': 'foreign',
    'title': '诗',
    'dynasty': '俄',
    'author': '茨维塔耶娃（译）',
    'content': '诗是心灵的语言，诗是灵魂的歌唱。',
    'highlight': '诗是心灵的语言，诗是灵魂的歌唱'
    },,
    {
    'type': 'foreign',
    'title': '山',
    'dynasty': '俄',
    'author': '茨维塔耶娃（译）',
    'content': '山很高，很远，但我们可以到达。',
    'highlight': '山很高，很远，但我们可以到达'
    },,
    {
    'type': 'foreign',
    'title': '大海',
    'dynasty': '法',
    'author': '兰波（译）',
    'content': '我在海边，听见海浪拍打礁石的声音。',
    'highlight': '我在海边，听见海浪拍打礁石的声音'
    },,
    {
    'type': 'foreign',
    'title': '醉舟',
    'dynasty': '法',
    'author': '兰波（译）',
    'content': '我曾在金色的船上航行，在无边的海上漂流。',
    'highlight': '我曾在金色的船上航行，在无边的海上漂流'
    },,
    {
    'type': 'foreign',
    'title': '文字的炼金术',
    'dynasty': '法',
    'author': '兰波（译）',
    'content': '我找到了声音中的颜色，颜色中的声音。',
    'highlight': '我找到了声音中的颜色，颜色中的声音'
    },,
    {
    'type': 'foreign',
    'title': '青春',
    'dynasty': '法',
    'author': '兰波（译）',
    'content': '青春是一阵风，吹过就消失了。',
    'highlight': '青春是一阵风，吹过就消失了'
    },,
    {
    'type': 'foreign',
    'title': '巴黎的妇人们',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '巴黎的妇人们，穿着黑衣，在街上行走。',
    'highlight': '巴黎的妇人们，穿着黑衣，在街上行走'
    },,
    {
    'type': 'foreign',
    'title': '应和',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '自然是座庙宇，有生命的柱子。',
    'highlight': '自然是座庙宇，有生命的柱子'
    },,
    {
    'type': 'foreign',
    'title': '信天翁',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '海员们抓起信天翁，让它们在甲板上跳跃。',
    'highlight': '海员们抓起信天翁，让它们在甲板上跳跃'
    },,
    {
    'type': 'foreign',
    'title': '美',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '美是一件珍贵的东西，藏在每个人的心里。',
    'highlight': '美是一件珍贵的东西，藏在每个人的心里'
    },,
    {
    'type': 'foreign',
    'title': '邀游',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '到远方去，到远方去，那里有很多我们不知道的东西。',
    'highlight': '到远方去，到远方去，那里有很多我们不知道的东西'
    },,
    {
    'type': 'foreign',
    'title': '秋歌',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '秋天是一个老人，在田野里叹息。',
    'highlight': '秋天是一个老人，在田野里叹息'
    },,
    {
    'type': 'foreign',
    'title': '黄昏的和谐',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '这是黄昏的时候，一切都沉浸在温柔的光里。',
    'highlight': '这是黄昏的时候，一切都沉浸在温柔的光里'
    },,
    {
    'type': 'foreign',
    'title': '灯塔',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '灯塔在黑暗中闪烁，为远航的船只指引方向。',
    'highlight': '灯塔在黑暗中闪烁，为远航的船只指引方向'
    },,
    {
    'type': 'foreign',
    'title': '雾与雨',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '雾和雨，在巴黎的街道上飘浮。',
    'highlight': '雾和雨，在巴黎的街道上飘浮'
    },,
    {
    'type': 'foreign',
    'title': '阳台',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '我的记忆像一扇敞开的阳台，面向过去。',
    'highlight': '我的记忆像一扇敞开的阳台，面向过去'
    },,
    {
    'type': 'foreign',
    'title': '阳台',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '我记起那些下午，那些温柔的黄昏，和你的眼睛。',
    'highlight': '我记起那些下午，那些温柔的黄昏，和你的眼睛'
    },,
    {
    'type': 'foreign',
    'title': '沉醉',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '沉醉吧，永远沉醉，不要让清醒的理智打败你。',
    'highlight': '沉醉吧，永远沉醉，不要让清醒的理智打败你'
    },,
    {
    'type': 'foreign',
    'title': '声音',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '远远地，传来一些声音，那是大自然的歌唱。',
    'highlight': '远远地，传来一些声音，那是大自然的歌唱'
    },,
    {
    'type': 'foreign',
    'title': '阳台',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '在那阳台上，我们一起看过夕阳。',
    'highlight': '在那阳台上，我们一起看过夕阳'
    },,
    {
    'type': 'foreign',
    'title': '声音',
    'dynasty': '法',
    'author': '波德莱尔（译）',
    'content': '有一种声音，在所有的沉默中回响。',
    'highlight': '有一种声音，在所有的沉默中回响'
    },,
    {
    'type': 'foreign',
    'title': '明天',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '明天，一切都将是新的，明天将是我们的。',
    'highlight': '明天，一切都将是新的，明天将是我们的'
    },,
    {
    'type': 'foreign',
    'title': '秋',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '秋天的雨滴在心上，和记忆一起叹息。',
    'highlight': '秋天的雨滴在心上，和记忆一起叹息'
    },,
    {
    'type': 'foreign',
    'title': '月光',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '月光在树林里穿行，像一个温柔的梦。',
    'highlight': '月光在树林里穿行，像一个温柔的梦'
    },,
    {
    'type': 'foreign',
    'title': '我不知道为什么',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '我的心在唱一首古老的歌，歌词里有你。',
    'highlight': '我的心在唱一首古老的歌，歌词里有你'
    },,
    {
    'type': 'foreign',
    'title': '爱情',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '爱情像一只蝴蝶，飞来飞去，不知道会落在哪里。',
    'highlight': '爱情像一只蝴蝶，飞来飞去，不知道会落在哪里'
    },,
    {
    'type': 'foreign',
    'title': '夜曲',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '夜曲在心中响起，像远处传来的钟声。',
    'highlight': '夜曲在心中响起，像远处传来的钟声'
    },,
    {
    'type': 'foreign',
    'title': '在你不在的时候',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '在你不在的时候，我独自在街上走。',
    'highlight': '在你不在的时候，我独自在街上走'
    },,
    {
    'type': 'foreign',
    'title': '五月的诗',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '五月是爱情的季节，五月是花开的季节。',
    'highlight': '五月是爱情的季节，五月是花开的季节'
    },,
    {
    'type': 'foreign',
    'title': '秋天',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '秋天的叶子落了，我们的故事也结束了。',
    'highlight': '秋天的叶子落了，我们的故事也结束了'
    },,
    {
    'type': 'foreign',
    'title': '无题',
    'dynasty': '法',
    'author': '魏尔伦（译）',
    'content': '我的心像一只孤独的鸟，在天空中飞翔。',
    'highlight': '我的心像一只孤独的鸟，在天空中飞翔'
    },,
    {
    'type': 'foreign',
    'title': '米拉波桥',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '米拉波桥下，塞纳河流过，我们的爱情也流过。',
    'highlight': '米拉波桥下，塞纳河流过，我们的爱情也流过'
    },,
    {
    'type': 'foreign',
    'title': '留言',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '如果你活着，就活着，不要等明天。',
    'highlight': '如果你活着，就活着，不要等明天'
    },,
    {
    'type': 'foreign',
    'title': '旋转的门',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '世界像一扇旋转的门，总是在变化。',
    'highlight': '世界像一扇旋转的门，总是在变化'
    },,
    {
    'type': 'foreign',
    'title': '诗',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '诗是心灵的窗户，打开它，可以看到另一个世界。',
    'highlight': '诗是心灵的窗户，打开它，可以看到另一个世界'
    },,
    {
    'type': 'foreign',
    'title': '米拉波桥',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '让我们手拉手，面对着风说：再见。',
    'highlight': '让我们手拉手，面对着风说：再见'
    },,
    {
    'type': 'foreign',
    'title': '远方',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '远方有什么？远方有海，有山，有我们未曾到达的地方。',
    'highlight': '远方有什么？远方有海，有山，有我们未曾到达的地方'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '夜来了，星星亮了，我在想你。',
    'highlight': '夜来了，星星亮了，我在想你'
    },,
    {
    'type': 'foreign',
    'title': '我',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '我是谁？我是一个影子，在阳光下移动。',
    'highlight': '我是谁？我是一个影子，在阳光下移动'
    },,
    {
    'type': 'foreign',
    'title': '诗人的命运',
    'dynasty': '法',
    'author': '阿波利奈尔（译）',
    'content': '诗人的命运是孤独的，诗人的命运是美丽的。',
    'highlight': '诗人的命运是孤独的，诗人的命运是美丽的'
    },,
    {
    'type': 'foreign',
    'title': '夜曲',
    'dynasty': '法',
    'author': '德彪西（译）',
    'content': '夜曲在心中响起，像远处传来的钟声。',
    'highlight': '夜曲在心中响起，像远处传来的钟声'
    },,
    {
    'type': 'foreign',
    'title': '黄昏',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '黄昏的光线很美，像一匹淡金色的丝绸。',
    'highlight': '黄昏的光线很美，像一匹淡金色的丝绸'
    },,
    {
    'type': 'foreign',
    'title': '海风',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '海风在吹，吹动了我的心，吹动了我的诗。',
    'highlight': '海风在吹，吹动了我的心，吹动了我的诗'
    },,
    {
    'type': 'foreign',
    'title': '骰子',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '掷骰子永远不会废除偶然。',
    'highlight': '掷骰子永远不会废除偶然'
    },,
    {
    'type': 'foreign',
    'title': '窗户',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '我打开窗户，看见外面的世界，看见远方的海。',
    'highlight': '我打开窗户，看见外面的世界，看见远方的海'
    },,
    {
    'type': 'foreign',
    'title': '房间',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '房间很静，书架上有很多书。',
    'highlight': '房间很静，书架上有很多书'
    },,
    {
    'type': 'foreign',
    'title': '孤独',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '孤独是一种美，在孤独中，我找到了诗。',
    'highlight': '孤独是一种美，在孤独中，我找到了诗'
    },,
    {
    'type': 'foreign',
    'title': '天鹅',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '天鹅在水中滑行，像一首无声的诗。',
    'highlight': '天鹅在水中滑行，像一首无声的诗'
    },,
    {
    'type': 'foreign',
    'title': '窗',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '窗外的风景在变，不变的是看风景的人。',
    'highlight': '窗外的风景在变，不变的是看风景的人'
    },,
    {
    'type': 'foreign',
    'title': '呼吸',
    'dynasty': '法',
    'author': '马拉美（译）',
    'content': '我在呼吸，呼吸着生命，呼吸着诗。',
    'highlight': '我在呼吸，呼吸着生命，呼吸着诗'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '我独自走在大路上，感受着夜的气息。',
    'highlight': '我独自走在大路上，感受着夜的气息'
    },,
    {
    'type': 'foreign',
    'title': '大路之歌',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '我走在大路上，大路很宽，大路很长。',
    'highlight': '我走在大路上，大路很宽，大路很长'
    },,
    {
    'type': 'foreign',
    'title': '自我之歌',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '我是我自己，我是一个宇宙，我是一个凡人。',
    'highlight': '我是我自己，我是一个宇宙，我是一个凡人'
    },,
    {
    'type': 'foreign',
    'title': '哦，船长！我的船长！',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '哦，船长！我的船长！我们的航程结束了！',
    'highlight': '哦，船长！我的船长！我们的航程结束了'
    },,
    {
    'type': 'foreign',
    'title': '草叶集',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '草叶在风中摇摆，像绿色的海浪。',
    'highlight': '草叶在风中摇摆，像绿色的海浪'
    },,
    {
    'type': 'foreign',
    'title': '我听见美洲在歌唱',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '我听见美洲在歌唱，各种声音汇成一片。',
    'highlight': '我听见美洲在歌唱，各种声音汇成一片'
    },,
    {
    'type': 'foreign',
    'title': '夜晚的火车',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '夜晚的火车穿过平原，轰隆隆地向前。',
    'highlight': '夜晚的火车穿过平原，轰隆隆地向前'
    },,
    {
    'type': 'foreign',
    'title': '海滨',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '我站在海滨，看着波浪翻滚。',
    'highlight': '我站在海滨，看着波浪翻滚'
    },,
    {
    'type': 'foreign',
    'title': '开放',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '打开你自己，让一切进来，让一切出去。',
    'highlight': '打开你自己，让一切进来，让一切出去'
    },,
    {
    'type': 'foreign',
    'title': '致一个陌生人',
    'dynasty': '美',
    'author': '惠特曼（译）',
    'content': '我走过你身边，没有说话，但我在心里记住了你。',
    'highlight': '我走过你身边，没有说话，但我在心里记住了你'
    },,
    {
    'type': 'foreign',
    'title': '你应该努力追求幸福',
    'dynasty': '美',
    'author': '米斯蒂（译）',
    'content': '你应该努力追求幸福。',
    'highlight': '你应该努力追求幸福'
    },,
    {
    'type': 'foreign',
    'title': '春天',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '有一个词叫春天，它比其他任何词都温暖。',
    'highlight': '有一个词叫春天，它比其他任何词都温暖'
    },,
    {
    'type': 'foreign',
    'title': '希望',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '希望是一只长着羽毛的东西，栖息在灵魂里。',
    'highlight': '希望是一只长着羽毛的东西，栖息在灵魂里'
    },,
    {
    'type': 'foreign',
    'title': '因为我不能停下来等死亡',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '因为我不能停下来等死亡，它就友好地停下来等我。',
    'highlight': '因为我不能停下来等死亡，它就友好地停下来等我'
    },,
    {
    'type': 'foreign',
    'title': '我',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '我是无名之辈，你是谁？',
    'highlight': '我是无名之辈，你是谁'
    },,
    {
    'type': 'foreign',
    'title': '成功',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '成功只是终极的事，真正的成功是去做。',
    'highlight': '成功只是终极的事，真正的成功是去做'
    },,
    {
    'type': 'foreign',
    'title': '剧痛',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '剧痛过后，有一种平静，像大海在风暴之后。',
    'highlight': '剧痛过后，有一种平静，像大海在风暴之后'
    },,
    {
    'type': 'foreign',
    'title': '回忆',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '回忆是一所房子，住着所有我们爱过的人。',
    'highlight': '回忆是一所房子，住着所有我们爱过的人'
    },,
    {
    'type': 'foreign',
    'title': '书',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '没有一艘船能像一本书，把我们带到远方。',
    'highlight': '没有一艘船能像一本书，把我们带到远方'
    },,
    {
    'type': 'foreign',
    'title': '我本可以容忍黑暗',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '我本可以容忍黑暗，如果我不曾见过太阳。',
    'highlight': '我本可以容忍黑暗，如果我不曾见过太阳'
    },,
    {
    'type': 'foreign',
    'title': '灵魂',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '灵魂选择自己的伴侣，然后关上门。',
    'highlight': '灵魂选择自己的伴侣，然后关上门'
    },,
    {
    'type': 'foreign',
    'title': '永恒',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '永恒不是时间的延续，而是一个瞬间。',
    'highlight': '永恒不是时间的延续，而是一个瞬间'
    },,
    {
    'type': 'foreign',
    'title': '美',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '美不需要解释，美本身就是理由。',
    'highlight': '美不需要解释，美本身就是理由'
    },,
    {
    'type': 'foreign',
    'title': '等待',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '等待是困难的，但等待的人是幸福的。',
    'highlight': '等待是困难的，但等待的人是幸福的'
    },,
    {
    'type': 'foreign',
    'title': '孤独',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '孤独是一种礼物，拆开它，需要勇气。',
    'highlight': '孤独是一种礼物，拆开它，需要勇气'
    },,
    {
    'type': 'foreign',
    'title': '我',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '我有一个看不见的王国，在我的心里。',
    'highlight': '我有一个看不见的王国，在我的心里'
    },,
    {
    'type': 'foreign',
    'title': '秋天',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '秋天是一个画家，把树叶染成金黄色。',
    'highlight': '秋天是一个画家，把树叶染成金黄色'
    },,
    {
    'type': 'foreign',
    'title': '风',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '风在窗外吹，像一个孩子在奔跑。',
    'highlight': '风在窗外吹，像一个孩子在奔跑'
    },,
    {
    'type': 'foreign',
    'title': '门',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '门关上了，但我知道，门还会再开。',
    'highlight': '门关上了，但我知道，门还会再开'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '夜是一个舞台，星星在上面表演。',
    'highlight': '夜是一个舞台，星星在上面表演'
    },,
    {
    'type': 'foreign',
    'title': '诗',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '诗是信，写给远方的人。',
    'highlight': '诗是信，写给远方的人'
    },,
    {
    'type': 'foreign',
    'title': '致生命',
    'dynasty': '美',
    'author': '狄金森（译）',
    'content': '谢谢你，生命，因为你还活着。',
    'highlight': '谢谢你，生命，因为你还活着'
    },,
    {
    'type': 'foreign',
    'title': '大海',
    'dynasty': '英',
    'author': '华兹华斯（译）',
    'content': '我独自漫游，像一朵云，飘浮在山丘和谷地之上。',
    'highlight': '我独自漫游，像一朵云，飘浮在山丘和谷地之上'
    },,
    {
    'type': 'foreign',
    'title': '咏水仙',
    'dynasty': '英',
    'author': '华兹华斯（译）',
    'content': '我像一朵云，在金色的水仙花中漫游。',
    'highlight': '我像一朵云，在金色的水仙花中漫游'
    },,
    {
    'type': 'foreign',
    'title': '孤独的收割人',
    'dynasty': '英',
    'author': '华兹华斯（译）',
    'content': '她在收割，她一个人在收割，歌声在田野里回荡。',
    'highlight': '她在收割，她一个人在收割，歌声在田野里回荡'
    },,
    {
    'type': 'foreign',
    'title': '致云雀',
    'dynasty': '英',
    'author': '华兹华斯（译）',
    'content': '云雀在天空歌唱，歌声像泉水一样流淌。',
    'highlight': '云雀在天空歌唱，歌声像泉水一样流淌'
    },,
    {
    'type': 'foreign',
    'title': '丁登寺旁',
    'dynasty': '英',
    'author': '华兹华斯（译）',
    'content': '五年已经过去，但那段记忆仍然在我心中。',
    'highlight': '五年已经过去，但那段记忆仍然在我心中'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '从一粒沙子看世界，从一朵野花看天堂。',
    'highlight': '从一粒沙子看世界，从一朵野花看天堂'
    },,
    {
    'type': 'foreign',
    'title': '梦',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '梦是心灵的窗户，打开它，可以看到另一个世界。',
    'highlight': '梦是心灵的窗户，打开它，可以看到另一个世界'
    },,
    {
    'type': 'foreign',
    'title': '永恒',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '永恒是一个瞬间，一个无限的瞬间。',
    'highlight': '永恒是一个瞬间，一个无限的瞬间'
    },,
    {
    'type': 'foreign',
    'title': '狮子',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '狮子在草原上奔跑，自由而孤独。',
    'highlight': '狮子在草原上奔跑，自由而孤独'
    },,
    {
    'type': 'foreign',
    'title': '夜',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '夜是一个黑色的帘子，遮住了所有的光。',
    'highlight': '夜是一个黑色的帘子，遮住了所有的光'
    },,
    {
    'type': 'foreign',
    'title': '早晨',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '早晨来了，太阳升起来了，世界亮了。',
    'highlight': '早晨来了，太阳升起来了，世界亮了'
    },,
    {
    'type': 'foreign',
    'title': '春天',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '春天来了，花开了，鸟在歌唱。',
    'highlight': '春天来了，花开了，鸟在歌唱'
    },,
    {
    'type': 'foreign',
    'title': '孤独的羊',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '一只羊在山坡上，很孤独，但它很平静。',
    'highlight': '一只羊在山坡上，很孤独，但它很平静'
    },,
    {
    'type': 'foreign',
    'title': '生命之树',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '生命是一棵树，从种子开始，长成大树。',
    'highlight': '生命是一棵树，从种子开始，长成大树'
    },,
    {
    'type': 'foreign',
    'title': '火焰',
    'dynasty': '英',
    'author': '布莱克（译）',
    'content': '火焰在燃烧，燃烧是生命的本质。',
    'highlight': '火焰在燃烧，燃烧是生命的本质'
    },,
    {
    'type': 'foreign',
    'title': '夜莺',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '夜莺在夜晚歌唱，歌声穿过树林，穿过田野。',
    'highlight': '夜莺在夜晚歌唱，歌声穿过树林，穿过田野'
    },,
    {
    'type': 'foreign',
    'title': '秋日',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '秋日的光落在田野上，金色的，很温暖。',
    'highlight': '秋日的光落在田野上，金色的，很温暖'
    },,
    {
    'type': 'foreign',
    'title': '孤独',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '孤独是什么？孤独是一个人在夜里，聆听风声。',
    'highlight': '孤独是什么？孤独是一个人在夜里，聆听风声'
    },,
    {
    'type': 'foreign',
    'title': '月亮',
    'dynasty': '英',
    'author': '济慈（译）',
    'content': '月亮在天空，安静地，孤独地，照着大地。',
    'highlight': '月亮在天空，安静地，孤独地，照着大地'
    },
];