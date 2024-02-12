「 sikaku（仮） 」は受動的な姿勢でも資格取得できるよう支援するサイトです。資格取得への学習のスタートの支援や学習継続へのモチベーションの提供が目的です。  

背景　  
　私自身、資格をたくさん持っているわけではないですが、資格に向けた勉強がとても好きです。  

なんといっても資格の良さは誰にとっても公平にその能力を示すことのできる絶対性にあると思います。人間にはさまざまな能力を持った人がいる中、資格は資格を取得するための能力を獲得するためのロードマップが具体的に示すことができます。  

社会では、自分で物事を考える主体性が求められ、またその重要性といえば社会人であれば誰もが感じていることだと思います。  私自身もそのうちの一人として、会社ではいかに周囲へ貢献することができるか、他者への貢献が働く上での喜びとなっています。一方で取得の目的は別として、資格取得の勉強ぐらい少し受動的になって取り組んでもいいと思います。また資格取得に向けた学習のハードルを下げ、一人でも学習に踏み込む方が増えれば幸いと感じます。  
上記がこのサイトの開発に取り組んだ主な理由となります。  


概要　  
　背景で記載した通り、資格を思いっきり受動的に取得できるよう支援するサイトとなります。  
受動的の定義として、それぞれの人に合わせて資格の取得までのレールを提案することとしています。また取得までの取り組みに際してのモチベーションの提供はします。一方で勉強時間の確保は各自ですることが求められます。  


使用技術  
PHP（Laravel）、JavaScript（react）、MySQL、AWS、Github、materialUI、tailwindCSS


使用技術選定理由  
・PHP（Laravel）  
Web系エンジニアへの転職を視野に入れたときに、独学で技術を学習するうえで教材の数が一定以上存在し、取り入れている企業の数も多く普及しており、技術力を高めていくのに本質と関係のないところでつまづき学習の継続に障壁となるものが少ないと感じたため。  
・JavaScript（react）  
PHPと同じく需要の大きい言語（フレームワーク）であることとフロントとバックエンドで異なる言語を用いてSPAを構成するために必要となる知識について学びたいと思ったため。  
・Github  
実際の開発現場のチーム開発でよく用いられていると思ったためです。個人での開発でありましたが、開発用ブランチを切って、プッシュし、プルリクエストを作成してマージすることで疑似的にチームのなかで開発しているような意識で利用しました。  
・AWS  
広く採用されていることに加え、フロントもしくはバックのみに知識が偏ることなくインフラ面で妥協せず注力することでエンジニアとして多角的に携わり業務の推進に貢献していくことができると思ったためです。  
特にSPA構成のプロダクトをインフラまで説明しているサイトはほとんどなく、非常に苦労した部分であるのですが、独学で実装することができたのは大きな自信となりました。  
![image](https://github.com/yudestiny/sikaku/assets/145823448/76fcd918-e72a-4509-b570-5c9d3d7acadd)  
Route53によりフロントとバックエンドの振り分けを行っています。またAWS Certificate ManagerによってHTTPSによるSSL通信を可能にしています。  
フロントではCloudFrontからS3で静的コンテンツを配信するようにしています。  
バックエンドでは、Application Load BalancerからPrivate SubnetにあるAPIサーバー（EC2 Instance）へHTTP通信し、データベースと接続しています。  
  
また、GithubActionsにより、masterブランチでプッシュすると、自動でテストを行い、S3へ静的コンテンツを保存・デプロイするようにしました。  


機能  
　主な機能は以下となります。  


・資格取得までの経験の投稿、閲覧、編集、削除  


1投稿  
　取得までに使ったサービス、要した期間を情報として提供していただきます。  
いいね機能により投稿数の増加が見込められればと考えています。  


2閲覧  
　投稿の一覧がご覧いただけます。  
検索機能により、自分が取得しようとしている資格に関する投稿に絞り込んだり、いいね数の多い人気記事を表示できるようにすることで、資格取得を考えている取り組みの第一歩を踏み込むモチベーションの提供につながればと考えています。  


3編集、削除  
　投稿した情報をユーザー側で管理できるようにすることで、安心して投稿していただけます。  


テーブル設計  
![image](https://github.com/yudestiny/sikaku/assets/145823448/3c470500-0fde-4028-8c88-dc35978e0243)  



こだわり  
SNSサイトであるため、投稿機能を利用してくれる人が少なければ自ずとサイトの閲覧数も伸びないため、特にユーザーに投稿してもらうところにこだわりました。  
・トップページの仕様  
　トップページに新規投稿一覧として投稿時間が新しい順に並べることで、ユーザーに閲覧される機会を増やす狙いを持っています。  
また一番メインの部分に資格をランキング形式で表示することで資格取得に対するモチベーションがそこまで高くない方々を対象として少しでも気になる資格の発見に寄与し他ユーザーの投稿へ誘導することを目的としています。  
・いいね機能の実装  
　投稿が実際に閲覧され誰かの役に立っているということを示す指標として、いいね機能といいね数を表示することにしました。  
またいいねされている数の多いユーザーをトップページにてランキング形式で表示しています。  
・STEPスライドによる遊び心  
　記事を投稿する画面では、どのように学習を進めてきたかを示すSTEPの部分でスライドを用いています。STEPの追加・削除・並び替えを操作一つで軽やかに行えるところに遊び心を置いています。  
記事詳細を閲覧する画面でも同様にSTEPにスライドを実装しており、人の学習プロセスをのぞき見するような演出を意識することでユーザーの心を動かします。  
・レスポンシブ対応  
　SNSサービスとしてすべてのユーザーが利用できる環境である必要性があると感じたためです。tailwindCSSとmaterialUIを用いてデザインを構成しています。  


苦労した点  
・STEPスライドの実装  
　フロント部分では記事投稿画面のスライドの追加・削除・並び替えをコード上で実現するのがとても時間を費やしました。  
 バックエンド部分ではデータベース操作で非常に悩みました。投稿画面での各入力値をpostsテーブルに保存する一方で、各STEPの入力値はpostsテーブルの子テーブルであるstepsテーブルに保存します。  
 STEPは配列形式で、その要素として親テーブルのservicesテーブルの外部キーが含まれており、当初の私はCreateOrFirstというメソッドを知らなかったため強引に実装しようとしてかなり苦労しました。  
 メソッドを見つけたときは目からうろこでした。  
