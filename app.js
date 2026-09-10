const state={screen:1,company:'',url:'',industry:'',product:'',promo:'',versions:[3,2,1],selectedDestination:'YouTube',saved:false,generated:false,chat:[{role:'ai',text:'広告動画を生成しています。\nこのままお待ちいただいたら、先に「シーンごとの内容」を確認・編集することもできます。'}],checks:{video:true,narration:true,brand:true,materials:true,copyright:true},output:{resolution:'1920 × 1080（フルHD）',fps:'30fps',format:'MP4（推奨）',quality:'高画質',bitrate:'推奨（10 Mbps）',color:'Rec.709（標準）'}};
const steps=['企画設計','映像構成','素材準備','映像生成','編集','最終確認','出力・完成'];
const nav=[['Home','⌂',1],['Analysis','◔',2],['Strategy','◎',5],['Creative','▣',6],['Projects','▤',6],['Library','▱',6],['Settings','⚙',6]];
const sceneImgs=['assets/scene1.jpg','assets/scene2.jpg','assets/scene3.jpg','assets/scene4.jpg'];
function esc(s){return String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
function save(){localStorage.setItem('acd-state',JSON.stringify(state))}
function load(){try{Object.assign(state,JSON.parse(localStorage.getItem('acd-state')||'{}'))}catch(e){}}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2300)}
function go(n){state.screen=n;save();render();window.scrollTo({top:0,behavior:'smooth'})}
function navHtml(){document.getElementById('nav').innerHTML=nav.map(([label,ico,target])=>`<button class="nav-item ${((state.screen===1&&target===1)||(state.screen>=2&&state.screen<=4&&label==='Analysis')||(state.screen===5&&label==='Strategy')||((state.screen>=6&&state.screen<=10)&&label==='Creative'))?'active':''}" onclick="${target===1?'go(1)':target===2?'go(2)':target===5?'go(5)':'toast(\'このナビゲーションは次の工程へのショートカットとして利用できます\')'}"><span class="ico">${ico}</span><span>${label}</span></button>`).join('')}
function header(no,label,title,lead){return `<div class="eyebrow"><span class="step-no">${no}</span>${label}</div><h1 class="screen-title">${title}</h1><p class="lead">${lead}</p>`}
function progress(current,total=5,labels=['企業情報入力','事業・サービス','強み・特徴','市場・競合','分析完了']){return `<div class="card progress-card"><div class="progress">${labels.map((x,i)=>`<div class="pstep ${i<current?'done':''} ${i===current?'current':''}"><div class="dot">${i<current?'✓':''}</div>${x}</div>`).join('')}</div></div>`}
function workflowProgress(current){return `<div class="card progress-card"><div class="progress">${steps.map((x,i)=>`<div class="pstep ${i<current?'done':''} ${i===current?'current':''}"><div class="dot">${i<current?'✓':''}</div>${x}</div>`).join('')}</div></div>`}
function setDestination(name){state.selectedDestination=name;const meta={YouTube:['16:9（横型）','1920 × 1080（フルHD）'],TikTok:['9:16（縦型）','1080 × 1920'],['Instagram Reels']:['9:16（縦型）','1080 × 1920'],['Instagram（フィード）']:['1:1（正方形）','1080 × 1080'],['カスタム設定']:['カスタム','自由設定']}[name]||['16:9（横型）','1920 × 1080（フルHD）'];state.output.resolution=meta[1];save();render()}
function screen1(){return `<section class="screen home"><div class="home-inner"><h1>AI Creative Director</h1><div class="divider"></div><h2>企業を理解する。広告を、つくる。</h2><p class="lead">AIが、分析から戦略、クリエイティブ制作までを一つにつなぎます。</p><div class="home-form"><input id="company" class="input hero-input" placeholder="会社名　　例）株式会社サンプル" value="${esc(state.company)}"><input id="url" class="input hero-input" placeholder="ホームページURL　　例）https://sample.co.jp" value="${esc(state.url)}"><button class="btn-primary hero-cta" onclick="startAnalysis()">✦　企業を理解する<small style="display:block;font-size:12px;margin-top:3px;font-weight:500">AI分析を開始します</small></button></div><div class="secure">♙　入力された情報は安全に保護されます</div></div><div class="home-cards"><div class="home-card"><span class="round">♙</span><b>AIによる深い企業理解</b><p>企業の情報を分析し、強みや価値をAIが深く理解します　›</p></div><div class="home-card"><span class="round">◎</span><b>最適な広告戦略の提案</b><p>ブランドに最適な広告戦略を立案し、成果につながるプランを提案します　›</p></div><div class="home-card"><span class="round">▣</span><b>クリエイティブを自動生成</b><p>動画・音楽・ナレーションをAIが生成し、高品質な広告を素早く制作します　›</p></div></div></section>`}
function startAnalysis(){state.company=document.getElementById('company').value.trim();state.url=document.getElementById('url').value.trim();if(!state.company||!state.url){toast('会社名とホームページURLを入力してください');return}go(2)}
function screen2(){return `<section class="screen">${header('02','AI Business Analysis','あなたの会社と、今回伝えたいものを教えてください。','AIが企業の情報を深く理解し、最適な広告戦略を立てるために、必要な情報を入力してください。')}<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start;margin-bottom:18px">${progress(0)}<div class="card"><b>分析ステップ</b><span style="float:right;color:#5642ff;font-size:12px">STEP 2/5 →</span></div></div><div class="two-cols"><div class="card"><h3>♙　企業の基本情報</h3><div class="field"><label>会社名</label><input id="s2company" class="input" value="${esc(state.company)}" placeholder="例）株式会社サンプル"></div><div class="field"><label>ホームページURL</label><input id="s2url" class="input" value="${esc(state.url)}" placeholder="例）https://sample.co.jp"></div><div class="field"><label>業種</label><select id="industry" class="select"><option value="">選択してください</option><option>IT・AI・SaaS</option><option>広告・マーケティング</option><option>製造業</option><option>医療・福祉</option><option>建設・不動産</option></select></div><div class="field"><label>主なプロダクト・サービス（取扱物）</label><textarea id="product" class="input" maxlength="500" placeholder="提供している主なプロダクトやサービス、取扱物についてご入力ください。">${esc(state.product)}</textarea><small class="muted" id="productCount">${state.product.length}/500</small></div><div class="field"><label>今回PRしたいもの・注力したいプロダクトやサービス</label><textarea id="promo" class="input" maxlength="500" placeholder="今回、特にPRしたい商品やサービス、注力している取り組みについてご入力ください。">${esc(state.promo)}</textarea><small class="muted" id="promoCount">${state.promo.length}/500</small></div></div><div class="card"><h3 style="color:#5542ef">✦　AIが自動で収集・分析する情報</h3><p class="muted" style="line-height:1.8;font-size:12px">入力いただいたURLをもとに、AIが企業の情報を自動で収集し、深く理解します。</p><ul class="check-list collection"><li>企業概要・沿革</li><li>事業内容・サービス詳細</li><li>所在地・拠点情報</li><li>設立年・従業員規模（推定）</li><li>実績・導入事例</li><li>ニュース・プレスリリース</li><li>企業のビジョン・価値観</li><li>その他、公開されている情報</li></ul><div class="analysis-visual" style="height:110px;margin-top:10px"><img class="analysis-logo" src="assets/aid-logo.png" style="width:70px"></div></div><div class="card"><h3>入力のポイント</h3>${[['◉','会社の「らしさ」を伝えましょう','企業の特徴や独自性が伝わる情報を入力することで、AIがより深く理解します。'],['◉','PRしたいものを明確に','目的が明確なほど、効果的な広告戦略とクリエイティブを提案できます。'],['◉','URLは必ず入力してください','AIが既存の情報を分析することで、入力の手間を減らし、精度を高めます。'],['◉','後から編集できます','入力した内容は、いつでも編集・更新することができます。']].map(x=>`<div style="display:flex;gap:12px;margin:18px 0"><span class="icon-round">${x[0]}</span><div><b>${x[1]}</b><p class="muted" style="font-size:11px;line-height:1.65">${x[2]}</p></div></div>`).join('')}<div class="safety">♙　<b>情報は安全に保護されます</b><br>入力いただいた情報は、AIによる分析と広告提案のみに使用され、第三者に公開されることはありません。</div></div></div><div class="card cta-band"><div class="message"><div class="section-label">✦　AIに企業を理解させましょう</div><b>入力した情報をもとに、AIが企業を深く理解し、最適な広告戦略の第一歩を踏み出します。</b></div><button class="btn-primary" onclick="submitBusiness()">✦　AIに企業を理解させる<br><small>次のステップへ進みます　→</small></button></div></section>`}
function submitBusiness(){state.company=document.getElementById('s2company').value.trim();state.url=document.getElementById('s2url').value.trim();state.industry=document.getElementById('industry').value;state.product=document.getElementById('product').value;state.promo=document.getElementById('promo').value;if(!state.company||!state.url){toast('会社名とURLは必須です');return}go(3)}
function screen3(){return `<section class="screen">${header('03','AI Analysis','AIが企業を理解しています。','Webサイトやサービス、ブランド、ニュースなどの情報をもとに、あなたの企業を多角的に分析し、理解を深めています。')}<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:18px;margin-bottom:18px">${progress(2)}<div class="card"><b>分析ステップ</b><span style="float:right;color:#5642ff">STEP 3/5</span><div style="margin-top:14px;color:#4d3bff;font-weight:800">企業情報入力　✓　　事業・サービス　✓　　強み・特徴　✦</div></div></div><div class="grid two"><div><div class="analysis-visual"><img class="analysis-logo" src="assets/aid-logo.png"><div class="analysis-msg">現在、企業について理解を深めています。<br>もう少しだけお待ちください。</div></div><div class="card" style="margin-top:18px"><div class="progress">${['企業理解','ブランド理解','市場理解','広告戦略'].map((x,i)=>`<div class="pstep ${i<2?'done':''} ${i===1?'current':''}"><div class="dot">${i<1?'✓':''}</div><b>${x}</b><small style="display:block;margin-top:7px">${i===0?'基本情報や事業内容を理解しました':i===1?'ブランドの特徴や強みを分析しています':'市場動向やポジションを分析します'}</small></div>`).join('')}</div></div></div><div class="card"><h3>AIが確認している情報</h3><ul class="info-list">${[['◎','Webサイト・サービス情報','公式サイトやサービス内容から、事業の特徴や提供価値を理解しています。'],['◔','市場・業界情報','業界動向や市場規模、成長性などの情報を収集・分析しています。'],['♧','競合・ポジショニング','競合他社の動向を分析し、市場での立ち位置を把握しています。'],['⚑','ニュース・評判','最新ニュースやメディア情報、口コミなど外部評価も確認しています。']].map(x=>`<li><span class="icon-round">${x[0]}</span><div><b>${x[1]}</b><p class="muted" style="font-size:11px;line-height:1.6">${x[2]}</p></div></li>`).join('')}</ul><div class="safety">♙　<b>分析はAIが自動で行っています</b><br>入力いただいた情報と公開データをもとに、AIが多角的な分析を行っています。</div></div></div><div class="card" style="margin-top:18px"><div class="section-label">✦　AIからの説明</div><b>AIはあなたの企業を深く理解することで、最適な広告戦略とクリエイティブを提案します。</b><p class="muted">分析が完了すると、企業の強みや市場での立ち位置をわかりやすくお伝えします。</p><div class="bottom-actions"><button class="btn-secondary" onclick="go(2)">← 戻る</button><button class="btn-primary" onclick="go(4)">分析結果を確認する　→</button></div></div></section>`}
function screen4(){return `<section class="screen">${header('04','Brand Analysis','AIが企業を理解しました。','AIが分析した結果をもとに、あなたの企業の強みや特徴、市場での立ち位置をシンプルにまとめました。')}<div class="card summary-card" style="margin-bottom:18px"><span class="icon-round">✦</span><div><b>AIの総合評価</b><div>独自の価値と強みを持ち、成長が期待できる企業です。</div></div></div><div class="three">${[['♛','企業の強み',['高いクリエイティブ力','信頼されるサービス','実行力とスピード','柔軟な対応力','デジタル技術の活用']],['◎','ブランドの特徴',['独自性のある価値提供','明確なビジョンと想い','ユーザー視点のサービス','専門性と技術力','共感を生むコミュニケーション']],['▥','市場での立ち位置',['ニーズの高い成長市場','競合と差別化された強み','顧客からの信頼が高い','拡大の余地が大きい','今後の成長ポテンシャルが高い']]].map(x=>`<div class="card metric-card"><span class="icon-round">${x[0]}</span><h3>${x[1]}</h3><ul class="check-list">${x[2].map(v=>`<li>${v}</li>`).join('')}</ul></div>`).join('')}</div><div class="insight" style="margin-top:18px"><div class="section-label">💡 AIからのインサイト</div><b>貴社は「信頼」と「専門性」を強みに、顧客の課題に寄り添いながら価値を提供しています。</b><p style="margin:8px 0 0">これらの強みをさらに明確に伝えることで、より多くの共感と成果を生むことが期待できます。</p></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(3)">← 戻る</button><button class="btn-primary" onclick="go(5)">次へ進む（広告戦略を立てる）　→</button></div></section>`}
function screen5(){return `<section class="screen">${header('05','Advertising Strategy','AIが最適な広告戦略を提案しました。','企業の強みと市場分析をもとに、成果につながる広告戦略を設計しました。')}<div class="strategy-top"><div class="card"><div class="section-label">広告戦略の全体方針</div><p style="font-size:15px;line-height:1.8">信頼性と専門性を軸に、ターゲットの課題解決に寄り添うメッセージで共感を生み、問い合わせ・成約につなげる。</p><div class="target-grid">${[['ターゲット','30〜50代のビジネス層\n課題解決を重視する経営者・担当者層'],['コアメッセージ','「信頼できる専門性で、ビジネスの成長を支える。」'],['提供価値','高い専門性と柔軟な対応力で最適なソリューションを提供']].map(x=>`<div class="mini"><b>${x[0]}</b><span style="white-space:pre-line;line-height:1.6;font-size:12px">${x[1]}</span></div>`).join('')}</div><div class="section-label" style="margin-top:18px">戦略のポイント</div><ul class="check-list"><li>ターゲットの課題に寄り添うコンテンツで信頼を獲得</li><li>実績や事例を活用し、専門性と成果を具体的に訴求</li><li>デジタルチャネルを最適に組み合わせ、効率的にリーチを拡大</li><li>継続的な改善とデータ分析で、PDCAを高速で回す</li></ul></div><div class="card"><div class="section-label">チャネル戦略</div><ul class="check-list channel">${[['▣','Web広告','検索広告・ディスプレイ広告で認知を拡大'],['◎','SNS広告','Facebook / Instagram / LinkedInで興味関心層にリーチ'],['▤','コンテンツマーケティング','ブログ・事例・ホワイトペーパーで信頼性を構築'],['✉','メールマーケティング','見込み客を育成し、問い合わせ・成約へ誘導']].map(x=>`<li><span class="icon-round">${x[0]}</span><div><b>${x[1]}</b><br><span class="muted">${x[2]}</span></div></li>`).join('')}</ul></div></div><div class="card" style="margin-top:18px"><div class="section-label">期待される成果</div><div class="result-grid">${[['◉','認知拡大','ブランド認知の向上'],['▥','リード獲得','質の高い見込み客の獲得'],['♧','エンゲージメント向上','関心・理解の深化'],['✦','売上・成約','問い合わせ・成約の増加']].map(x=>`<div class="result"><span class="icon-round">${x[0]}</span><b>${x[1]}</b><span class="muted">${x[2]}</span></div>`).join('')}</div></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(4)">← 戻る</button><button class="btn-primary" onclick="go(6)">次へ進む（クリエイティブ提案を見る）　→</button></div></section>`}
function screen6(){return `<section class="screen">${header('06','Creative Planning','AIが具体的な広告の企画を作成しました。','広告戦略をもとに、ストーリー・映像構成・使用素材を設計しました。')}${workflowProgress(4)}<div class="grid two" style="margin-top:18px"><div><div class="card"><div class="section-label">企画コンセプト</div><h2 style="margin:0 0 8px">企業を理解する。広告を、つくる。</h2><p class="muted">Sampleの信頼性と専門性が、人々や人々の未来を支え、新しい価値と成長を生み出す姿を描くストーリーです。</p><div class="section-label">ストーリーの流れ</div><div class="story">${[['▥','課題の提示'],['♧','信頼の価値'],['◎','未来への変化'],['✦','未来のビジョン']].map(x=>`<div class="mini"><span class="icon-round" style="margin:auto">${x[0]}</span><b>${x[1]}</b><small class="muted">信頼・専門性・未来</small></div>`).join('')}</div></div><div class="grid two" style="margin-top:18px"><div class="card"><div class="section-label">❝ キーメッセージ（ナレーション案）</div><p style="line-height:1.9">「信頼は、目に見えない力です。<br>しかし、その力が未来を支えます。<br>Sampleは、確かな専門性と技術で、<br>企業の信頼を守り、新しい価値を創造します。<br>共に、次の未来へ。」</p></div><div class="card"><div class="section-label">▧ トーン＆イメージ</div>${['信頼感','先進的','洗練された','未来志向','クリーン','安心・安全'].map(x=>`<span class="pill">${x}</span>`).join('')}<img class="tone" src="assets/scene1.jpg"></div></div></div><div class="card"><div class="section-label">▣　映像構成案（シーン構成）</div><div class="scene-list">${sceneImgs.map((im,i)=>`<div class="scene-row"><img src="${im}"><div><b>0${i+1}　${['オープニング｜課題の提示','信頼の価値','未来への変化','未来のビジョン'][i]}</b><p class="muted" style="font-size:11px;margin:5px 0">${['変化するビジネス環境の中で、企業が直面する課題を描写。','Sampleの専門性と技術が、確かな信頼を生み出すシーン。','信頼によって、企業や人々の可能性が広がっていく様子。','共に創る、より良い未来へ。希望に満ちた未来の風景。'][i]}</p></div><b>約${[5,6,7,6][i]}秒</b></div>`).join('')}</div></div></div><div class="card" style="margin-top:18px"><div class="section-label">使用素材</div><div class="assets">${sceneImgs.map((im,i)=>`<div class="asset"><img src="${im}"><div>${['企業イメージ.jpg','ロゴ.png','オフィス風景.jpg','サービス画面.png'][i]}<br><span class="muted">AI取得・画像</span></div></div>`).join('')}<div class="add-box" onclick="document.getElementById('fileInput').click()">＋<br>素材を追加</div></div></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(5)">← 戻る</button><button class="btn-primary" onclick="go(7)">この内容で動画を生成する　→</button></div></section>`}
function videoControls(){return `<div class="controls"><button onclick="toast('動画を再生します')">▶</button><span>00:08 / 00:30</span><div class="seek"><span></span></div><span>🔊</span><span>⚙</span><span>⛶</span></div>`}
function chatPanel(revision=false){
 const extra=revision?`<div class="bubble ai"><b style="color:#5946ff">AIの提案内容</b><br>✓ オープニングの空を明るく調整<br>✓ 全体の色温度をやや暖かく変更<br>✓ コントラストを調整し、メリハリを強化<br>✓ ナレーションのトーンを少し落ち着かせる</div><button class="btn-secondary" onclick="toast('変更内容をプレビューしました')">変更内容をプレビュー</button><div class="bubble ai">この提案を適用しますか？</div><div style="display:flex;gap:8px"><button class="btn-secondary" style="flex:1" onclick="toast('別案を生成します')">別の案を提案</button><button class="btn-primary" style="flex:1;height:42px" onclick="applyRevision()">変更を適用する</button></div>`:'';
 return `<div class="card chat"><h3 style="color:#5542ef">✦ AIアシスタント</h3><div class="chat-body" id="chatBody">${state.chat.map(m=>`<div class="bubble ${m.role}">${esc(m.text).replace(/\n/g,'<br>')}</div>`).join('')}${extra}</div><div class="chat-input"><input id="chatInput" placeholder="${revision?'変更したい内容を入力してください…':'メッセージを入力…'}"><button onclick="sendChat()">➤</button></div></div>`
}
function sendChat(){const input=document.getElementById('chatInput');if(!input||!input.value.trim())return;state.chat.push({role:'user',text:input.value.trim()});state.chat.push({role:'ai',text:'承知しました。ご要望を理解しました。最適な変更案を作成しています。'});save();render();setTimeout(()=>document.getElementById('chatBody')?.scrollTo(0,9999),0)}
function applyRevision(){state.versions.unshift(state.versions[0]+1);toast('変更を適用しました。新しいバージョンを保存しました');save();render()}
function screen7(){return `<section class="screen">${header('07','Video Generation','AIが広告動画を生成中です。','企画内容と使用素材をもとに、AIが映像・ナレーション・音楽を組み合わせて最適な広告動画を生成しています。')}${workflowProgress(3)}<div class="video-layout" style="margin-top:18px"><div><div class="card" style="padding:10px"><div class="video-frame"><img src="assets/video-clean.jpg"><span class="pill" style="position:absolute;left:15px;top:15px;background:rgba(10,26,60,.65);color:#fff">プレビュー（生成中）</span><span class="pill" style="position:absolute;right:15px;top:15px;background:rgba(10,26,60,.65);color:#fff">生成中… 72%</span><div class="video-title">企業を理解する。広告を、つくる。<small style="display:block;font-size:16px;margin-top:10px">AIが、分析から戦略、クリエイティブ制作までを一つにつなぎます。</small></div><div class="video-overlay">${videoControls()}</div></div></div><div class="card" style="margin-top:18px"><div class="section-label">シーン構成（全4シーン）</div><div class="scene-strip">${sceneImgs.map((im,i)=>`<div class="scene-thumb"><img src="${im}"><b>0${i+1} ${['オープニング｜課題の提示','信頼の価値','未来への変化','未来のビジョン'][i]}</b><small class="muted">約${[5,6,7,6][i]}秒</small></div>`).join('')}</div></div></div><div>${chatPanel(false)}<div class="card" style="margin-top:18px"><div class="section-label">⚙ 生成設定</div><ul class="settings-list">${[['動画の長さ','30秒'],['アスペクト比','16:9（横型）'],['ナレーション','あり（男性・落ち着いたトーン）'],['BGM','あり（信頼感・シネマティック）'],['テロップ','あり'],['言語','日本語']].map(x=>`<li><b>${x[0]}</b><span>${x[1]}</span></li>`).join('')}</ul></div></div></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(6)">← 戻る（企画に戻る）</button><button class="btn-secondary" onclick="toast('生成を一時停止しました')">Ⅱ　一時停止</button><button class="btn-secondary" onclick="toast('動画を再生成します')">↻　再生成する</button><button class="btn-primary" onclick="go(8)">生成が完了したらプレビューする　→</button></div></section>`}
function screen8(){return `<section class="screen">${header('08','Video Revision','AIと対話しながら、広告動画をブラッシュアップします。','気になる部分や変更したい内容を伝えるだけで、AIが最適な形に調整します。納得いくまで、何度でも編集・改善が可能です。')}${workflowProgress(4)}<div class="revision-grid" style="margin-top:18px"><div><div class="card" style="padding:10px"><div class="video-frame"><img src="assets/video-clean.jpg"><span class="pill" style="position:absolute;left:15px;top:15px;background:rgba(10,26,60,.65);color:#fff">編集中のプレビュー</span><span class="pill" style="position:absolute;right:15px;top:15px;background:rgba(10,26,60,.65);color:#fff">✦ バージョン 3⌄</span><div class="video-title">企業を理解する。広告を、つくる。<small style="display:block;font-size:16px;margin-top:10px">AIが、分析から戦略、クリエイティブ制作までを一つにつなぎます。</small></div><div class="video-overlay">${videoControls()}</div></div></div><div class="card" style="margin-top:14px"><div class="section-label">シーン編集（全4シーン）</div><div class="scene-strip">${sceneImgs.map((im,i)=>`<div class="scene-thumb"><img src="${im}"><b>0${i+1} ${['オープニング｜企業理解','分析・理解','戦略設計','クリエイティブ制作'][i]}</b><small class="muted">約${[5,8,7,10][i]}秒</small></div>`).join('')}</div></div><div class="grid three" style="margin-top:14px"><div class="card"><div class="section-label">ナレーション・BGM・テロップ</div>${['ナレーション','BGM','テロップ'].map(x=>`<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #edf0f7;font-size:11px"><span>${x}</span><span>〰〰〰　▶　変更</span></div>`).join('')}</div><div class="card"><div class="section-label">映像スタイル</div><div class="quick-grid horizontal-tools">${['トーン','色','カメラワーク','テキスト','エフェクト','スタイル'].map(x=>`<button class="quick" type="button" onclick="toast('${x}を調整します')">${x}</button>`).join('')}</div></div><div class="card"><div class="section-label">クイック調整</div><div class="quick-grid horizontal-tools">${['明るさ','コントラスト','彩度','スピード','リセット','その他'].map(x=>`<button class="quick" type="button" onclick="toast('${x}を調整します')">${x}</button>`).join('')}</div></div></div><div class="card output-mini-card" style="margin-top:14px"><div class="section-label">出力先・サイズ</div><div class="output-destinations">${[['YouTube','16:9','1920 × 1080'],['TikTok','9:16','1080 × 1920'],['Instagram Reels','9:16','1080 × 1920'],['Instagram（フィード）','1:1','1080 × 1080']].map(x=>`<button type="button" class="output-destination ${state.selectedDestination===x[0]?'selected':''}" onclick="setDestination('${x[0]}')"><b>${x[0]}</b><span>${x[1]}</span><small>${x[2]}</small></button>`).join('')}</div></div></div><div><div>${chatPanel(true)}</div><div class="card" style="margin-top:14px"><div class="section-label">変更履歴</div><ul class="history">${state.versions.map((v,i)=>`<li><b>● バージョン${v} ${i===0?'（現在）':''}</b><br><span class="muted">${i===0?'明るさと色味を調整し、見やすいトーンに変更':'初回生成・前回の編集内容'}</span></li>`).join('')}</ul></div></div></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(7)">← 戻る（映像生成に戻る）</button><button class="btn-secondary" onclick="state.saved=true;save();toast('現在の状態を保存しました')">▣ 現在の状態を保存</button><button class="btn-primary" onclick="go(9)">編集内容を確定して次へ進む（プレビュー確認へ）　→</button></div></section>`}
function screen9(){return `<section class="screen">${header('09','Final Check','動画の最終確認を行いましょう。','すべての内容を確認し、完成した広告動画をチェックしてください。必要に応じて編集に戻ることも、出力・公開準備に進むこともできます。')}${workflowProgress(5)}<div class="revision-grid" style="margin-top:18px"><div><div class="card" style="padding:10px"><div class="video-frame"><img src="assets/video-clean.jpg"><span class="pill" style="position:absolute;left:15px;top:15px;background:rgba(10,26,60,.65);color:#fff">完成プレビュー</span><div class="video-title">企業を理解する。広告を、つくる。<small style="display:block;font-size:16px;margin-top:10px">AIが、分析から戦略、クリエイティブ制作までを一つにつなぎます。</small></div><div class="video-overlay">${videoControls()}</div></div></div><div class="card" style="margin-top:14px"><div class="section-label">シーン構成（全4シーン）</div><div class="scene-strip">${sceneImgs.map((im,i)=>`<div class="scene-thumb"><img src="${im}"><b>0${i+1} ${['オープニング｜企業理解','分析・理解','戦略設計','クリエイティブ制作'][i]}</b><small class="muted">約${[5,8,7,10][i]}秒</small></div>`).join('')}</div></div><div class="grid three" style="margin-top:14px"><div class="card"><div class="section-label">ナレーション・BGM・テロップ</div><p>〰〰〰　▶　00:30</p><p>〰〰〰　▶　00:30</p><p>〰〰〰　▶　00:30</p></div><div class="card"><div class="section-label">使用素材</div><div class="material-row">${sceneImgs.slice(0,3).map(im=>`<img src="${im}">`).join('')}</div><p class="section-label" style="margin-top:12px">すべての素材を確認 →</p></div><div class="card"><div class="section-label">ブランド・スタイル</div><p>ロゴ　Sample</p><p>メインカラー　▣ ▣ ▣</p><p>フォント　Noto Sans JP / Inter</p></div></div></div><div class="side-stack"><div class="card"><div class="section-label">✦ AIサマリー</div><p class="muted">AI Creative Director が作成した広告動画の要点をまとめました。</p><div class="mini"><b>主要メッセージ</b><span>企業理解から分析・戦略・クリエイティブ制作までを一つにつなぐことを表現。</span></div><div class="mini"><b>感情・トーン</b><span>先進的・洗練された・未来志向のトーン。</span></div><div class="mini"><b>視覚的インパクト</b><span>朝日や都市の映像を活用し、未来志向のビジュアルを構成。</span></div></div><div class="card"><div class="section-label">最終チェックリスト</div><ul class="check-list">${[['映像・音声の破綻がないことを確認しました','video'],['ナレーション・テロップの内容を確認しました','narration'],['ブランドロゴ・カラーの整合性を確認しました','brand'],['使用素材・シーン構成を確認しました','materials'],['著作権・利用権の問題がないことを確認しました','copyright']].map(x=>`<li><input type="checkbox" ${state.checks[x[1]]?'checked':''} onchange="state.checks.${x[1]}=this.checked;save()"> ${x[0]}</li>`).join('')}</ul></div><div class="card"><div class="section-label">動画情報</div><div class="video-info">${[['タイトル','企業を理解する。広告を、つくる。'],['尺','30秒'],['アスペクト比','16:9（横型）'],['解像度','1920 × 1080（フルHD）'],['フレームレート','30fps'],['ファイル形式（予定）','MP4'],['作成日','2026/08/19']].map(x=>`<div>${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div></div></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(8)">← 戻る（編集に戻る）</button><button class="btn-secondary" onclick="toast('プレビューを再生します')">▶ プレビューをもう一度再生</button><button class="btn-secondary" onclick="toast('PDFレポートを準備しています')">▧ PDFレポートを出力</button><button class="btn-primary" onclick="go(10)">この内容で出力設定に進む（次へ）　→</button></div></section>`}
function screen10(){return `<section class="screen">${header('10','Export & Publish','出力設定を行い、広告動画を完成させましょう。','最適な形式・サイズを選択し、用途に合わせて書き出しや公開の準備を行います。')}${workflowProgress(6)}<div style="margin-top:18px"><h3>1. 出力先を選択</h3><p class="muted">公開・配信するプラットフォームを選択してください。</p><div class="destinations">${[['▶','YouTube','16:9（横型）','1920 × 1080'],['♪','TikTok','9:16（縦型）','1080 × 1920'],['◎','Instagram Reels','9:16（縦型）','1080 × 1920'],['◎','Instagram（フィード）','1:1（正方形）','1080 × 1080'],['…','カスタム設定','自由にサイズを設定','']].map(x=>`<button class="destination ${state.selectedDestination===x[1]?'selected':''}" onclick="setDestination('${x[1]}')"><div class="logo-text">${x[0]}</div><b>${x[1]}</b><small>${x[2]}<br>${x[3]}</small></button>`).join('')}</div></div><div class="export-layout" style="margin-top:18px"><div><div class="card"><h3>2. 出力設定</h3><p class="muted">動画の品質や形式を設定してください。</p><div class="settings-grid">${[['解像度','resolution',['1920 × 1080（フルHD）','1280 × 720（HD）']],['フレームレート','fps',['30fps','60fps']],['ファイル形式','format',['MP4（推奨）','MOV']],['ビットレート','bitrate',['推奨（10 Mbps）','高（20 Mbps）']],['カラープロファイル','color',['Rec.709（標準）','sRGB']]].map(x=>`<label>${x[0]}<select class="select" onchange="state.output.${x[1]}=this.value;save()">${x[2].map(v=>`<option ${state.output[x[1]]===v?'selected':''}>${v}</option>`).join('')}</select></label>`).join('')}</div><div style="margin-top:12px"><b>画質</b><div style="display:flex;gap:7px;margin-top:8px">${['標準','高画質','最高画質'].map(v=>`<button class="pill" style="padding:10px 16px;${state.output.quality===v?'background:#604bff;color:#fff':''}" onclick="state.output.quality='${v}';save();render()">${v}</button>`).join('')}</div></div><div class="mini" style="margin-top:12px">詳細設定（コーデック・音声設定など）　⌄</div></div><div class="card" style="margin-top:14px"><h3>4. 公開・配信オプション（任意）</h3><p class="muted">出力後の公開方法を選択できます。</p><div class="options">${[['ダウンロード','動画ファイルをPCに保存します。'],['クラウド保存','プロジェクトライブラリに保存します。'],['リンク共有','共有用のURLを生成します。'],['直接公開（連携）','各プラットフォームに直接公開します。']].map((x,i)=>`<div class="option"><div class="option-row"><b>${x[0]}</b><button class="toggle ${i<2?'on':''}" onclick="this.classList.toggle('on')"></button></div><small class="muted">${x[1]}</small></div>`).join('')}</div></div></div><div class="side-stack"><div class="card"><h3>3. プレビュー</h3><p class="muted">出力内容の最終プレビューです。</p><div class="video-frame"><img src="assets/video-clean.jpg"><div class="video-title" style="font-size:22px">企業を理解する。広告を、つくる。<small style="display:block;font-size:11px">AIが、分析から戦略、クリエイティブ制作までを一つにつなぎます。</small></div><div class="video-overlay">${videoControls()}</div></div><div class="preview-info">${[['タイトル','企業を理解する。広告を、つくる。'],['尺','30秒'],['アスペクト比',(state.selectedDestination==='TikTok'||state.selectedDestination==='Instagram Reels')?'9:16':state.selectedDestination==='Instagram（フィード）'?'1:1（正方形）':'16:9（横型）'],['解像度',state.output.resolution],['サイズ（推定）','約 65.2 MB']].map(x=>`<div>${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div><div class="card"><h3>プロジェクト概要</h3><div class="video-frame"><img src="assets/video-clean.jpg"></div><p><b>プロジェクト名</b>　企業を理解する。広告を、つくる。</p><p><b>作成日</b>　2025/05/20 14:35</p><p><b>最終更新</b>　2025/05/20 16:42</p><p><b>作成者</b>　株式会社サンプル</p></div><div class="card"><div class="section-label">チェックリスト</div><ul class="check-list"><li>映像・音声の破綻がないことを確認しました</li><li>ナレーション・テロップの内容を確認しました</li><li>ブランドロゴ・カラーの整合性を確認しました</li><li>著作権・利用権の問題がないことを確認しました</li></ul></div></div></div><div class="card" style="margin-top:18px"><div class="section-label">💡 ワンポイント</div><p style="margin:0;line-height:1.7">出力後もプロジェクトに戻って再編集や別バージョンの作成が可能です。必要に応じて、複数のフォーマットでの書き出しもおすすめです。</p></div><div class="bottom-actions"><button class="btn-secondary" onclick="go(9)">← 戻る（最終確認に戻る）</button><button class="btn-secondary" onclick="state.saved=true;save();toast('下書きとして保存しました')">▱ 下書きとして保存</button><button class="btn-primary" onclick="state.generated=true;save();toast('出力・書き出しを開始しました')">↓ 出力・書き出しを開始　→</button></div></section>`}
function render(){navHtml();const s=document.getElementById('screen');s.innerHTML=state.screen===1?screen1():state.screen===2?screen2():state.screen===3?screen3():state.screen===4?screen4():state.screen===5?screen5():state.screen===6?screen6():state.screen===7?screen7():state.screen===8?screen8():state.screen===9?screen9():screen10();bindCounts()}
function bindCounts(){const p=document.getElementById('product'),q=document.getElementById('promo');if(p)p.oninput=()=>{document.getElementById('productCount').textContent=p.value.length+'/500'};if(q)q.oninput=()=>{document.getElementById('promoCount').textContent=q.value.length+'/500'}}
document.getElementById('fileInput').addEventListener('change',e=>{if(e.target.files.length)toast(`${e.target.files.length}件の素材を追加しました`)})
document.getElementById('notify').onclick=()=>toast('新しい通知はありません')
document.getElementById('mobileMenu').onclick=()=>document.querySelector('.sidebar').style.display='flex'
load();render();
// --- ここから下をすべてコピーして、app.jsの「一番下」に貼り付けてください ---

// 1. ダミーURLの上書き（探さなくて済むように自動書き換えします）
const _oldS1 = screen1;
screen1 = function() { return _oldS1().replace(/sample\.co\.jp/g, 'app.example.invalid'); };
const _oldS2 = screen2;
screen2 = function() { return _oldS2().replace(/sample\.co\.jp/g, 'app.example.invalid'); };

// 2. メニューに「Settings（画面11）」を追加
nav[6] = ['Settings', '⚙️', 11];

// 3. データ保存の仕組みをダミー環境（MockStorage）に変更
const MockStorage = {
    id: 'sample-project',
    update: function(data) { localStorage.setItem('acd-state', JSON.stringify(data)); },
    get: function() {
        try { return JSON.parse(localStorage.getItem('acd-state') || '{}'); } catch(e) { return {}; }
    }
};
save = function() { MockStorage.update(state); };
load = function() { Object.assign(state, MockStorage.get()); };

// 4. サブスクリプションと広告の画面（画面11）を追加
function screen11() {
    return `<section class="screen">
        <div class="eyebrow"><span class="step-no">⚙️</span>システム設定</div>
        <h1 class="screen-title">プラン・サブスクリプション</h1>
        <p class="lead">現在のご利用プランと、広告表示の設定です。（※ダミー画面です）</p>

        <div class="grid two" style="margin-top:18px">
            <div class="card">
                <div class="section-label">現在のプラン</div>
                <h2 style="color:#4d3bff; margin-bottom: 5px;">無料プラン（Free）</h2>
                <p class="muted">基本的な機能が利用可能です。</p>
                <ul class="check-list" style="margin: 15px 0;">
                    <li>✅ 全ての基本機能</li>
                    <li>✅ 月間10回までのAI生成</li>
                    <li>❌ 広告の非表示</li>
                </ul>
                <button class="btn-primary" style="width: 100%;" onclick="toast('プレミアムプランへの決済画面へ移動します（ダミー）')">プレミアムプラン（月額980円）にする</button>
            </div>

            <div class="card" style="background: #f8f9ff; border: 2px dashed #c1c8e6; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 250px;">
                <span style="color: #68749d; font-size: 12px; margin-bottom: 10px;">スポンサーリンク（ダミー広告枠）</span>
                <div style="width: 80%; height: 100px; background: #e3e7f4; display: grid; place-items: center; color: #68749d; font-weight: bold; border-radius: 8px;">
                    ここにGoogle広告などが<br>表示されます
                </div>
            </div>
        </div>
    </section>`;
}

// 5. 画面切り替えの仕組みを更新して、画面を再描画
render = function() {
    navHtml();
    const s = document.getElementById('screen');
    s.innerHTML = state.screen===1 ? screen1()
                : state.screen===2 ? screen2()
                : state.screen===3 ? screen3()
                : state.screen===4 ? screen4()
                : state.screen===5 ? screen5()
                : state.screen===6 ? screen6()
                : state.screen===7 ? screen7()
                : state.screen===8 ? screen8()
                : state.screen===9 ? screen9()
                : state.screen===10 ? screen10()
                : screen11();
    bindCounts();
};

// 新しい設定をすぐに画面に反映させる
render();
// --- ここまで ---
// --- ここからコピー（app.jsの最後に追加） ---
const iconStyle = document.createElement('style');
iconStyle.innerHTML = `
  .sidebar { width: 240px !important; }
  .main { margin-left: 240px !important; }
  .brand img { width: 120px !important; height: 120px !important; margin-bottom: 15px; }
`;
document.head.appendChild(iconStyle);
// --- ここまで --
// --- ここからコピー（app.jsの一番下に追加） ---

// 1. メニューを「広告作成」や「分析」用に分かりやすく変更
navHtml = function() {
    const newNav = [
        ['ホーム', '🏠', 1],
        ['広告作成 (A/Bテスト)', '✨', 6],
        ['集客・分析データ', '📊', 2],
        ['プラン・設定', '⚙️', 11]
    ];
    document.getElementById('nav').innerHTML = newNav.map(([label,ico,target]) => 
        `<button class="nav-item ${state.screen===target ? 'active' : ''}" onclick="go(${target})">
            <span class="ico">${ico}</span><span>${label}</span>
        </button>`
    ).join('');
};

// 2. ホーム画面（画面1）のタイトルと説明文を変更
const _oldS1_v3 = screen1;
screen1 = function() {
    let html = _oldS1_v3();
    html = html.replace('AI Creative Director', 'Global Ad Creator (仮)');
    html = html.replace('企業を理解する。広告を、つくる。', '世界へ届く広告を、AIと作ろう。');
    html = html.replace('AIが、分析から戦略、クリエイティブ制作までを一つにつなぎます。', '多言語対応の広告作成から、集客分析・A/Bテストまで一元管理できます。');
    return html;
};

// 3. 画面の右上に「多言語切り替え（翻訳）ボタン」を追加
const topbarStyle = document.createElement('style');
topbarStyle.innerHTML = `.lang-switch { margin-left: auto; margin-right: 15px; padding: 5px 10px; border-radius: 8px; border: 1px solid #dce1f0; background: #fff; cursor: pointer; font-weight: bold; }`;
document.head.appendChild(topbarStyle);

const _oldRender2 = render;
render = function() {
    _oldRender2(); // 元の画面描画を実行
    
    // トップバーに言語切り替えボタンを差し込む
    const topbar = document.querySelector('.topbar');
    if (topbar && !document.querySelector('.lang-switch')) {
        const langSelect = document.createElement('select');
        langSelect.className = 'lang-switch';
        langSelect.innerHTML = '<option>🇯🇵 日本語</option><option>🇺🇸 English</option><option>🇨🇳 中文</option>';
        langSelect.onchange = () => toast('言語を「' + langSelect.value + '」に切り替えます（ダミー）');
        
        const notifyBtn = document.getElementById('notify');
        if(notifyBtn) topbar.insertBefore(langSelect, notifyBtn);
    }
};

// 新しい設定をすぐに画面に反映
render();
// --- ここまで ---
// --- ここからコピー（app.jsの一番下に【さらに追加】して貼り付けてください） ---

// 1. 左メニューを「前のデザイン（元のアイコン）」に戻しつつ、システム名は維持する
navHtml = function() {
    // nav[0][1]などは、一番最初のオリジナルデザインで使われていたアイコンを呼び出しています
    const newNav = [
        ['ホーム', nav[0][1], 1],
        ['広告作成 (A/Bテスト)', nav[3][1], 6],
        ['集客・分析データ', nav[1][1], 2],
        ['プラン・設定', nav[6][1], 11]
    ];
    document.getElementById('nav').innerHTML = newNav.map(([label,ico,target]) => 
        `<button class="nav-item ${state.screen===target ? 'active' : ''}" onclick="go(${target})">
            <span class="ico">${ico}</span><span>${label}</span>
        </button>`
    ).join('');
};

// 2. 言語切り替え（翻訳）の選択肢を、無料でできる範囲で大幅に追加
const _oldRender_v5 = render;
render = function() {
    _oldRender_v5(); // これまでの画面描画を実行
    
    // すでに言語ボタンがあれば一度削除して、新しいものに入れ替えます
    const existingLangBtn = document.querySelector('.lang-switch');
    if (existingLangBtn) existingLangBtn.remove();

    const topbar = document.querySelector('.topbar');
    if (topbar) {
        const langSelect = document.createElement('select');
        langSelect.className = 'lang-switch';
        // 無料で対応可能な主要言語をリストアップ
        langSelect.innerHTML = `
            <option>🇯🇵 日本語 (Japanese)</option>
            <option>🇺🇸 English (US)</option>
            <option>🇬🇧 English (UK)</option>
            <option>🇨🇳 中文 (简体)</option>
            <option>🇹🇼 中文 (繁體)</option>
            <option>🇰🇷 한국어 (Korean)</option>
            <option>🇪🇸 Español (Spanish)</option>
            <option>🇫🇷 Français (French)</option>
            <option>🇩🇪 Deutsch (German)</option>
            <option>🇮🇳 हिन्दी (Hindi)</option>
            <option>🇸🇦 العربية (Arabic)</option>
            <option>🇵🇹 Português (Portuguese)</option>
        `;
        langSelect.onchange = () => toast('言語を「' + langSelect.value + '」に切り替えます（ダミー）');
        
        const notifyBtn = document.getElementById('notify');
        if(notifyBtn) topbar.insertBefore(langSelect, notifyBtn);
    }
};

// 新しい設定をすぐに画面に反映
render();
// --- ここまで ---
// --- ここからコピー（app.jsの一番下に【さらに追加】して貼り付けてください） ---

// 「広告作成 (A/Bテスト)」画面（画面番号6）の中身を新しく作り直します
const _oldS6 = screen6;
screen6 = function() {
    return `<section class="screen">
        <div class="eyebrow"><span class="step-no">✨</span>広告作成</div>
        <h1 class="screen-title">広告作成 (A/Bテスト)</h1>
        <p class="lead">ターゲットや訴求ポイントを入力すると、AIがA/Bテスト用の広告文を2パターン自動生成します。（※ダミー画面です）</p>

        <div class="grid two" style="margin-top:18px">
            <!-- 左側：入力フォーム -->
            <div class="card">
                <div class="section-label">AIへの指示（プロンプト）</div>
                
                <div class="field">
                    <label>ターゲット層</label>
                    <input class="input" placeholder="例：20代〜30代の働く女性">
                </div>
                
                <div class="field">
                    <label>アピールしたい強み（箇条書き）</label>
                    <textarea class="input" placeholder="例：\n・時短で簡単\n・無添加で安心"></textarea>
                </div>

                <div class="field">
                    <label>広告のトーン＆マナー</label>
                    <select class="select">
                        <option>親しみやすくカジュアル</option>
                        <option>誠実で信頼感がある</option>
                        <option>インパクト重視</option>
                    </select>
                </div>

                <button class="btn-primary" style="width: 100%; margin-top: 15px;" onclick="toast('AIが広告文を生成中...（ダミー）')">AIで広告を生成する</button>
            </div>

            <!-- 右側：生成結果（プレビュー） -->
            <div class="card">
                <div class="section-label">生成結果（A/Bテスト用）</div>
                
                <div style="background: #f8f8ff; border: 1px solid #edf0f8; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                    <b style="color:#4d3bff;">パターンA：課題解決型</b>
                    <p style="font-size: 13px; line-height: 1.6; margin-top: 8px;">毎日忙しいあなたへ。たった5分で完成する、無添加のやさしい味わいをお試しください！</p>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <span class="pill" style="cursor:pointer;" onclick="toast('パターンAを採用しました')">採用する</span>
                        <span class="pill" style="background:#fff; border: 1px solid #dce1f0; color: #68749d; cursor:pointer;" onclick="toast('修正リクエストを送信します')">修正を依頼</span>
                    </div>
                </div>

                <div style="background: #f8f8ff; border: 1px solid #edf0f8; border-radius: 12px; padding: 15px;">
                    <b style="color:#4d3bff;">パターンB：メリット提示型</b>
                    <p style="font-size: 13px; line-height: 1.6; margin-top: 8px;">無添加だから安心、なのに早い！働く女性のための新定番アイテムが登場しました。</p>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <span class="pill" style="cursor:pointer;" onclick="toast('パターンBを採用しました')">採用する</span>
                        <span class="pill" style="background:#fff; border: 1px solid #dce1f0; color: #68749d; cursor:pointer;" onclick="toast('修正リクエストを送信します')">修正を依頼</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
};

// 新しい設定をすぐに画面に反映
render();
// --- ここまで ---
// --- ここからコピー（app.jsの一番下に【さらに追加】して貼り付けてください） ---

// 1. エディタ画面用の追加スタイル（CSS）を適用
const editorStyle = document.createElement('style');
editorStyle.innerHTML = `
    .editor-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; }
    .editor-preview { background: #111; border-radius: 12px; overflow: hidden; position: relative; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
    .editor-preview img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
    .play-btn { position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: grid; place-items: center; color: white; font-size: 24px; cursor: pointer; backdrop-filter: blur(4px); border: 2px solid rgba(255,255,255,0.5); }
    .timeline-strip { display: flex; gap: 10px; overflow-x: auto; padding: 10px 0; }
    .timeline-item { min-width: 120px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; cursor: pointer; position: relative; }
    .timeline-item.active { border-color: #5946ff; }
    .timeline-item img { width: 100%; height: 68px; object-fit: cover; display: block; }
    .timeline-item span { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: white; font-size: 10px; padding: 2px 5px; }
    .chat-panel { display: flex; flex-direction: column; height: 400px; }
    .chat-history { flex: 1; overflow-y: auto; padding: 10px; background: #f8f9ff; border-radius: 8px; margin-bottom: 10px; }
    .chat-bubble { max-width: 85%; padding: 10px 15px; border-radius: 12px; margin-bottom: 10px; font-size: 13px; line-height: 1.5; }
    .chat-bubble.ai { background: #fff; border: 1px solid #e3e7f4; align-self: flex-start; }
    .chat-bubble.user { background: #5946ff; color: white; align-self: flex-end; margin-left: auto; }
    .chat-input-area { display: flex; gap: 8px; }
    .chat-input-area input { flex: 1; padding: 10px; border: 1px solid #dce1f0; border-radius: 8px; outline: none; }
`;
document.head.appendChild(editorStyle);

// 2. 「広告作成」画面（screen6）を設計図ベースのエディタ画面に大幅改修
const _oldS6_v2 = screen6;
screen6 = function() {
    return `<section class="screen">
        <div class="eyebrow"><span class="step-no">✨</span>AI生成完了</div>
        <h1 class="screen-title">広告動画エディタ</h1>
        <p class="lead">生成された動画を確認し、AIチャットで細かく修正指示を出すことができます。（※ダミー画面です）</p>

        <div class="editor-layout" style="margin-top:20px;">
            <!-- 左側：プレビューとタイムライン -->
            <div>
                <div class="card" style="padding: 15px;">
                    <div class="section-label">プレビュー</div>
                    <div class="editor-preview">
                        <img src="assets/scene1.jpg" alt="preview">
                        <div class="play-btn" onclick="toast('動画を再生します（ダミー）')">▶</div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 15px; align-items: center;">
                        <span style="font-weight: bold;">00:00 / 00:15</span>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn-secondary" style="height: 36px; padding: 0 15px;" onclick="toast('BGMを変更（ダミー）')">🎵 BGM</button>
                            <button class="btn-secondary" style="height: 36px; padding: 0 15px;" onclick="toast('ナレーションを変更（ダミー）')">🎙️ 音声</button>
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-top: 15px; padding: 15px;">
                    <div class="section-label">タイムライン (シーン構成)</div>
                    <div class="timeline-strip">
                        <div class="timeline-item active" onclick="toast('シーン1を選択')"><img src="assets/scene1.jpg"><span>01 導入</span></div>
                        <div class="timeline-item" onclick="toast('シーン2を選択')"><img src="assets/scene2.jpg"><span>02 課題</span></div>
                        <div class="timeline-item" onclick="toast('シーン3を選択')"><img src="assets/scene3.jpg"><span>03 解決策</span></div>
                        <div class="timeline-item" onclick="toast('シーン4を選択')"><img src="assets/scene4.jpg"><span>04 CTA</span></div>
                        <div class="timeline-item" style="display:grid; place-items:center; border: 2px dashed #dce1f0; background: #f8f9ff;" onclick="toast('シーンを追加')">
                            <span style="position:static; background:transparent; color:#5946ff; font-weight:bold; font-size:20px;">+</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右側：AIチャットアシスタント -->
            <div class="card" style="padding: 15px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #f0f0f0; margin-bottom: 15px;">
                    <b style="color:#5946ff; padding-bottom: 10px; border-bottom: 2px solid #5946ff; margin-bottom: -2px;">AIチャット</b>
                    <span style="color:#68749d; cursor:pointer;" onclick="toast('詳細設定タブへ切り替え（ダミー）')">詳細設定</span>
                </div>
                
                <div class="chat-panel">
                    <div class="chat-history">
                        <div class="chat-bubble ai">
                            <b>AI ディレクター</b><br>
                            「20代働く女性向け」の動画広告を生成しました。全体の色味をもう少し明るくしますか？それともテキストを変えますか？
                        </div>
                        <div class="chat-bubble user">
                            シーン2の文字をもっと大きくして、BGMをポップなものにして。
                        </div>
                        <div class="chat-bubble ai">
                            <b>AI ディレクター</b><br>
                            承知しました。シーン2のテキストサイズを150%に拡大し、BGMを「Pop & Cheerful 03」に変更して再生成しました。プレビューをご確認ください。
                        </div>
                    </div>
                    <div class="chat-input-area">
                        <input type="text" placeholder="AIに修正指示を出す (例: もっと明るく)">
                        <button class="btn-primary" style="height: 40px; border-radius: 8px; padding: 0 15px;" onclick="toast('AIに送信しました（ダミー）')">送信</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bottom-actions">
            <button class="btn-secondary" onclick="toast('下書き保存しました')">下書き保存</button>
            <button class="btn-primary" onclick="toast('書き出し設定へ進みます（ダミー）')">この動画を書き出す</button>
        </div>
    </section>`;
};

// 新しい設定をすぐに画面に反映
render();
// --- ここまで ---
// --- ここからコピー（app.jsの一番下に【さらに追加】して貼り付けてください） ---

// 1. エディタ画面(screen6)の「書き出し」ボタンを実際に画面10へ繋ぐ
const _oldS6_v3 = screen6;
screen6 = function() {
    return _oldS6_v3().replace(
        `onclick="toast('書き出し設定へ進みます（ダミー）')"`, 
        `onclick="go(10)"`
    );
};

// 2. 分析データ画面（screen2）をダミーのグラフ付きダッシュボードに改修
const _oldS2_v3 = screen2;
screen2 = function() {
    return `<section class="screen">
        <div class="eyebrow"><span class="step-no">📊</span>データ分析</div>
        <h1 class="screen-title">集客・分析データ</h1>
        <p class="lead">配信中の広告パフォーマンスと、A/Bテストの結果をリアルタイムで確認できます。（※ダミー画面です）</p>

        <div class="grid three" style="margin-top:18px">
            <div class="card metric-card">
                <span class="icon-round">👁️</span>
                <h3>総インプレッション</h3>
                <div style="font-size: 32px; font-weight: bold; color: #101b4b;">1,284,500</div>
                <span style="color: #6bc2a1; font-weight: bold; font-size: 12px;">↑ 前月比 +15%</span>
            </div>
            <div class="card metric-card">
                <span class="icon-round">🖱️</span>
                <h3>平均クリック率 (CTR)</h3>
                <div style="font-size: 32px; font-weight: bold; color: #101b4b;">3.42%</div>
                <span style="color: #6bc2a1; font-weight: bold; font-size: 12px;">↑ 前月比 +0.8%</span>
            </div>
            <div class="card metric-card">
                <span class="icon-round">💰</span>
                <h3>獲得単価 (CPA)</h3>
                <div style="font-size: 32px; font-weight: bold; color: #101b4b;">¥2,150</div>
                <span style="color: #e55353; font-weight: bold; font-size: 12px;">↓ 前月比 -5% (改善)</span>
            </div>
        </div>

        <div class="card" style="margin-top: 18px;">
            <div class="section-label">A/Bテスト パフォーマンス比較</div>
            <div style="display: flex; gap: 20px; margin-top: 15px;">
                <div style="flex: 1; border: 1px solid #edf0f8; border-radius: 12px; padding: 15px;">
                    <b style="color:#4d3bff;">パターンA（課題解決型）</b>
                    <div style="height: 150px; background: repeating-linear-gradient(45deg, #f0f0fb, #f0f0fb 10px, #fff 10px, #fff 20px); border-radius: 8px; margin: 10px 0; display:grid; place-items:center; color:#68749d;">棒グラフ（ダミー）</div>
                    <ul class="check-list">
                        <li>CTR: 4.1% (勝者👑)</li>
                        <li>CVR: 2.8%</li>
                    </ul>
                </div>
                <div style="flex: 1; border: 1px solid #edf0f8; border-radius: 12px; padding: 15px;">
                    <b style="color:#68749d;">パターンB（メリット提示型）</b>
                    <div style="height: 150px; background: repeating-linear-gradient(45deg, #f8f8ff, #f8f8ff 10px, #fff 10px, #fff 20px); border-radius: 8px; margin: 10px 0; display:grid; place-items:center; color:#68749d;">棒グラフ（ダミー）</div>
                    <ul class="check-list">
                        <li>CTR: 2.7%</li>
                        <li>CVR: 1.9%</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>`;
};

// 3. 動画の書き出し・出力画面（screen10）の改修
const _oldS10_v2 = screen10;
screen10 = function() {
    return `<section class="screen">
        <div class="eyebrow"><span class="step-no">🚀</span>出力・配信</div>
        <h1 class="screen-title">動画の書き出しと配信</h1>
        <p class="lead">作成した広告動画を各プラットフォーム向けに最適化して書き出します。（※ダミー画面です）</p>

        <div class="export-layout" style="margin-top:18px">
            <div>
                <div class="card">
                    <h3>1. 配信先プラットフォーム</h3>
                    <div class="destinations" style="grid-template-columns: repeat(3, 1fr);">
                        <button class="destination selected" onclick="toast('YouTubeを選択')">
                            <div class="logo-text">YouTube</div><b>16:9</b><small>1920×1080</small>
                        </button>
                        <button class="destination" onclick="toast('TikTokを選択')">
                            <div class="logo-text">TikTok / Shorts</div><b>9:16</b><small>1080×1920</small>
                        </button>
                        <button class="destination" onclick="toast('Instagramを選択')">
                            <div class="logo-text">Instagram</div><b>1:1</b><small>1080×1080</small>
                        </button>
                    </div>
                </div>

                <div class="card" style="margin-top:14px">
                    <h3>2. 多言語字幕・翻訳出力</h3>
                    <div class="options" style="grid-template-columns: repeat(2, 1fr);">
                        <div class="option">
                            <div class="option-row"><b>自動字幕生成</b><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
                            <small class="muted">動画の音声から字幕を自動生成します</small>
                        </div>
                        <div class="option">
                            <div class="option-row"><b>AI多言語吹き替え</b><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
                            <small class="muted">英語・中国語などの音声を同時生成</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="side-stack">
                <div class="card">
                    <h3>最終プレビュー</h3>
                    <div class="video-frame" style="border-radius: 8px; overflow: hidden; background: #111; aspect-ratio: 16/9;">
                        <img src="assets/scene1.jpg" style="width: 100%; opacity: 0.7; object-fit: cover;">
                    </div>
                    <button class="btn-primary" style="width: 100%; margin-top: 15px;" onclick="toast('レンダリングを開始しました（完了）')">一括書き出し・配信</button>
                    <button class="btn-secondary" style="width: 100%; margin-top: 10px;" onclick="go(6)">エディタに戻る</button>
                </div>
            </div>
        </div>
    </section>`;
};

// 画面を再描画
render();
// --- ここまで ---