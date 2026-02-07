楽天ブックス雑誌検索APIは、楽天ブックスで販売されている雑誌の情報を取得することが可能なAPIです。デベロッパーは雑誌のタイトルや出版社名などでの商品検索をはじめ、ジャンル別や在庫状態などでの絞り込み検索も可能となります。  
（楽天ブックス総合検索APIよりも詳細な検索が可能となっています。）

リクエストURL（REST／JSON形式の場合）

  

```ruby
https://openapi.rakuten.co.jp/services/api/BooksMagazine/Search/20170404?[parameter]=[value]…
```

※JSONP形式は、JSON形式で入力パラメーターにcallBackを指定することで出力されます。

フィールド名title, publisherName,sortに対応する\[value\]はUTF-8でURLエンコードされている必要があります。（リクエストURL全体をエンコードするのではなく、\[value\]部分を個別にエンコードしてください。）  
たとえば、「経済」という雑誌名で、「ビジネス(booksGenreId=007604001)」ジャンルの雑誌を検索し、結果を価格の安い順に並べたい（sort=+itemPrice）場合のリクエストURLは下記になります。  
（実際には改行せず1行につなげてリクエストしてください。）

```perl
https://openapi.rakuten.co.jp/services/api/BooksMagazine/Search/20170404?
    applicationId=[アプリID]
    &title=%E7%B5%8C%E6%B8%88
    &booksGenreId=007604001
    &sort=%2BitemPrice
```

※短い時間の間に大量に、同一のリクエストURLへアクセスすると、一定時間利用できなくなる場合がございます。テストの際にはご注意ください。

入力パラメーター

楽天ブックス雑誌検索API 入力パラメーター version:2017-04-04

|             ID              |             項目名             |           パラメーター            |        型(括弧内は最大バイト数)        |             必須              |            デフォルト            |                                                                                                                                                                                                                                                                                                                                                                                                                                    備考                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|-----------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Division: Shared parameters | Division: Shared parameters | Division: Shared parameters | Division: Shared parameters | Division: Shared parameters | Division: Shared parameters |                                                                                                                                                                                                                                                                                                                                                                                                                       Division: Shared parameters                                                                                                                                                                                                                                                                                                                                                                                                                        |
|              1              |           App ID            |        applicationId        |           String            |             ![必須](https://webservice.rakuten.co.jp/img/img_applied.gif)              |             \-              | Required along with access key  
Check here |
|              2              |       Access Key【NEW】       |          accessKey          |           String            |             ![必須](https://webservice.rakuten.co.jp/img/img_applied.gif)              |             \-              | Can be provided in either header or as parameter  
Required along with app ID  
Check here |
|              3              |        Affiliate ID         |         affiliateId         |           String            |             \-              |             \-              |                                                                                                                                                                                                                                                                                                                                                                                                                                Check here                                                                                                                                                                                                                                                                                                                                                                                                                                |
|              4              |       Response format       |           format            |           String            |             \-              |            json             | Either JSON or XML  
When JSON is specified the callback parameter can also be set in order to use JSONP. |
|              5              |   Callback function name    |          callback           |           String            |             \-              |             \-              | Function name to be used with the JSONP output  
(UTF-8 URL encoded string)  
Alphanumeric characters, periods, or underscores |
|              6              |   Choosing output fields    |          elements           |           String            |             \-              |             \-              | By default, API response all of the fields. You can change response fields by this parameter.  
This parameter's data is separated by comma(,).  
For example, following request will response only itemName, itemPrice and itemUrl.  
`elements=itemName,itemPrice,itemUrl` |
|              7              |       Format version        |        formatVersion        |             int             |             \-              |              1              | Response format version.

If `formatVersion=2` is set, the response format (JSON) will be improved.

In case of `formatVersion=1` :  
Our API response will be returned in Array format as the followings.  
You would need to use notation `items[0].item.itemName` To access `itemName` parameter.

?

1

2

3

4

5

6

7

8

9

10

`{``"items"``: [`

    `{``"item"``: {`

        `"itemName"``:` `"a"``,`

        `"itemPrice"``: 10`

    `}},`

    `{``"item"``: {`

        `"itemName"``:` `"b"``,`

        `"itemPrice"``: 20`

    `}}`

`]}`

In case of `formatVersion=2` :  
Our API response will be returned in Array format as the followings.  
You can use notation `items[0].itemName` To access `itemName` parameter.

?

1

2

3

4

5

6

7

8

9

10

`{``"items"``: [`

    `{`

        `"itemName"``:` `"a"``,`

        `"itemPrice"``: 10`

    `},`

    `{`

        `"itemName"``:` `"b"``,`

        `"itemPrice"``: 20`

    `}`

`]}` |
|       区分:サービス固有パラメーター       |       区分:サービス固有パラメーター       |       区分:サービス固有パラメーター       |       区分:サービス固有パラメーター       |       区分:サービス固有パラメーター       |       区分:サービス固有パラメーター       |                                                                                                                                                                                                                                                                                                                                                                                                                             区分:サービス固有パラメーター                                                                                                                                                                                                                                                                                                                                                                                                                              |
|              1              |           雑誌タイトル            |            title            |           String            | ![Affiliate対応あり](https://webservice.rakuten.co.jp/img/img_applied.gif)  
(\*1) |             \-              | 雑誌のタイトルから検索  
UTF-8でURLエンコードした文字列  
複数キーワードから検索したい場合は、半角スペースで区切って下さい  
(\*1)タイトル、出版社名、JANコード、楽天ブックスジャンルIDのいずれかが指定されていることが必須です |
|              2              |            出版社名             |        publisherName        |           String            | ![Affiliate対応あり](https://webservice.rakuten.co.jp/img/img_applied.gif)  
(\*1) |             \-              | 出版社名から検索  
UTF-8でURLエンコードした文字列  
複数キーワードから検索したい場合は、半角スペースで区切って下さい  
(\*1)タイトル、出版社名、JANコード、楽天ブックスジャンルIDのいずれかが指定されていることが必須です |
|              3              |          雑誌のJANコード          |             jan             |            long             | ![Affiliate対応あり](https://webservice.rakuten.co.jp/img/img_applied.gif)  
(\*1) |             \-              | 雑誌に付与されているJANコードから検索  
(\*1)タイトル、出版社名、JANコード、楽天ブックスジャンルIDのいずれかが指定されていることが必須です |
|              4              |        楽天ブックスジャンルID         |        booksGenreId         |           String            | ![Affiliate対応あり](https://webservice.rakuten.co.jp/img/img_applied.gif)  
(\*1) |             007             | 楽天ブックスにおけるジャンルを特定するためのID  
（楽天市場のジャンルIDとは違うので注意してください）  
booksGenreId=007（雑誌）に所属するジャンルのみが指定できます  
ジャンルのIDやジャンル名、ジャンルの親子関係を調べたい場合は、「楽天ブックスジャンル検索API(BooksGenre/Search)」をご利用ください。  
(\*1)タイトル、出版社名、JANコード、楽天ブックスジャンルIDのいずれかが指定されていることが必須です |
|              5              |        1ページあたりの取得件数         |            hits             |             int             |             \-              |             30              |                                                                                                                                                                                                                                                                                                                                                                                                                                1から30までの整数                                                                                                                                                                                                                                                                                                                                                                                                                                |
|              6              |            取得ページ            |            page             |             int             |             \-              |              1              |                                                                                                                                                                                                                                                                                                                                                                                                                               1から100までの整数                                                                                                                                                                                                                                                                                                                                                                                                                                |
|              7              |            在庫状況             |        availability         |           int(1)            |             \-              |              0              | 0：すべての商品  
1：在庫あり  
2：通常3～7日程度で発送  
3：通常3～9日程度で発送  
4：メーカー取り寄せ  
5：予約受付中  
6：メーカーに在庫確認 |
|              8              |       品切れ等購入不可商品表示フラグ       |       outOfStockFlag        |           int(1)            |             \-              |              0              | 0：品切れや販売終了など購入不可の商品は結果に表示させない  
1：品切れや販売終了など購入不可の商品を結果に表示させる |
|              9              |           チラよみフラグ           |        chirayomiFlag        |           int(1)            |             \-              |              0              | 0：すべての商品  
1：チラよみ対象商品で絞り込む |
|             10              |             ソート             |            sort             |           String            |             \-              |          standard           | standard:標準  
sales:売れている  
+releaseDate:発売日(古い)  
\-releaseDate:発売日(新しい)  
+itemPrice:価格が安い  
\-itemPrice:価格が高い  
reviewCount:レビューの件数が多い  
reviewAverage:レビューの評価(平均)が高い  
※UTF-8でURLエンコードされている必要があります。 |
|             11              |            限定フラグ            |         limitedFlag         |           int(1)            |             \-              |              0              | 0:すべての商品  
1:限定版商品のみ  
※限定版商品には期間限定・数量限定・予約限定などの商品が含まれます。 |
|             12              |            キャリア             |           carrier           |           int(1)            |             \-              |              0              | PC用の情報を返すのか、モバイル用の情報を返すのかを選択  
PC: 0  
mobile: 1 |
|             13              |       ジャンルごとの商品数取得フラグ       |    genreInformationFlag     |           int(1)            |             \-              |              0              | 0 :ジャンルごとの商品数の情報を取得しない  
1 :ジャンルごとの商品数の情報を取得する |

出力パラメーター

楽天ブックス雑誌検索API 出力パラメーター version:2017-04-04

|                                                                            ID                                                                            |                                                                           大分類                                                                            |       分類        |       項目名       |     パラメーター      |                                                                        備考                                                                        |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|-----------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
|                                                                     区分:サービス固有パラメーター                                                                      |                                                                     区分:サービス固有パラメーター                                                                      | 区分:サービス固有パラメーター | 区分:サービス固有パラメーター | 区分:サービス固有パラメーター |                                                                 区分:サービス固有パラメーター                                                                  |
|                                                                            1                                                                             |                                                                           全体情報                                                                           |      全体情報       |       検索数       |      count      |                                                                    検索結果の総商品数                                                                     |
|                                                                           全体情報                                                                           |                                                                           全体情報                                                                           |        2        |      ページ番号      |      page       |                                                                     現在のページ番号                                                                     |
|                                                                           全体情報                                                                           |                                                                           全体情報                                                                           |        3        |    ページ内商品始追番    |      first      |                                                                   検索結果の何件目からか                                                                    |
|                                                                           全体情報                                                                           |                                                                           全体情報                                                                           |        4        |    ページ内商品終追番    |      last       |                                                                   検索結果の何件目までか                                                                    |
|                                                                           全体情報                                                                           |                                                                           全体情報                                                                           |        5        |      ヒット件数      |      hits       |                                                                    1度に返却する商品数                                                                    |
|                                                                           全体情報                                                                           |                                                                           全体情報                                                                           |        6        |     キャリア情報      |     carrier     |                                                                 PC=0 or mobile=1                                                                 |
|                                                                           全体情報                                                                           |                                                                           全体情報                                                                           |        7        |      総ページ数      |    pageCount    |                                                                      最大100                                                                       |
|                                                                            8                                                                             | 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |     商品情報詳細      |     雑誌タイトル      |      title      |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |        9        |    雑誌タイトル カナ    |    titleKana    |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       10        |      出版社名       |  publisherName  |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       11        |     JANコード      |       jan       |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       12        |      商品説明文      |   itemCaption   |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       13        |       発売日       |    salesDate    | 表示例：「YYYY年」「YYYY年MM月」「YYYY年MM月DD日」  
※発売日が確定されていない商品については、「上旬/中旬/下旬」や「頃」「以降」などが付加 |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       14        |     発行サイクル      |      cycle      |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       15        |     税込み販売価格     |    itemPrice    |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       16        |       定価        |    listPrice    | ※楽天ブックスの仕様変更により、2013/11/28から一律で0を返却しております。  
こちらの値のご利用をお控えいただけますようお願いいたします。 |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       17        |       割引率       |  discountRate   | ※楽天ブックスの仕様変更により、2013/11/28から一律で0を返却しております。  
こちらの値のご利用をお控えいただけますようお願いいたします。 |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       18        |       割引額       |  discountPrice  | ※楽天ブックスの仕様変更により、2013/11/28から一律で0を返却しております。  
こちらの値のご利用をお控えいただけますようお願いいたします。 |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       19        |      商品URL      |     itemUrl     |                                                                httpsではじまる商品ごとのURL                                                                |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       20        |   アフィリエイトURL    |  affiliateUrl   |                                  （入力パラメーターにアフィリエイトIDが含まれていた時のみ） ※carrierパラメーターの指定に関わらずPC/mobile両対応のhttps URLを返却                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       21        |  商品画像 64x64URL  |  smallImageUrl  |                                                          httpsではじまる商品画像(64x64ピクセル)のURL                                                           |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       22        | 商品画像 128x128URL | mediumImageUrl  |                                                         httpsではじまる商品画像(128x128ピクセル)のURL                                                          |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       23        | 商品画像 200x200URL |  largeImageUrl  |                                                         httpsではじまる商品画像(200x200ピクセル)のURL                                                          |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       24        |     チラよみURL     |  chirayomiUrl   |                                                       チラよみ対象商品の場合は表示,httpsではじまるチラよみ対象商品URL                                                       |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       25        |      在庫状況       |  availability   | 1：在庫あり  
2：通常3～7日程度で発送  
3：通常3～9日程度で発送  
4：メーカー取り寄せ  
5：予約受付中  
6：メーカーに在庫確認 |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       26        |      送料フラグ      |   postageFlag   | 0:送料別  
1:宅配送料無料  
2:送料無料(コンビニ送料含む)  
※キャンペーンなどで実際の送料の扱いは、出力内容と異なることがあります |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       27        |      限定フラグ      |   limitedFlag   | 0:通常商品  
1:限定版商品  
※限定版商品には期間限定・数量限定・予約限定などの商品が含まれます。 |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       28        |     レビュー件数      |   reviewCount   |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                          商品情報詳細                                                                          |       29        |     レビュー平均      |  reviewAverage  |                                                                                                                                                  |
| 商品情報  
（全体：<Items> ～ </Items> 、  
個別商品：<Item> ～ </Item>） |                                                                            30                                                                            |     ジャンル情報      |  楽天ブックスジャンルID   |  booksGenreId   | 所属する最下位のジャンルIDを表示  
該当商品が複数ジャンルに所属している場合は、「/」で区切ってそれぞれのジャンルIDを表示 |
|                                                                            31                                                                            | ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |      親ジャンル      |       \-        |     parent      |                                                                 入力したジャンルIDの親ジャンル                                                                 |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          親ジャンル                                                                           |       32        |  楽天ブックスジャンルID   |  booksGenreId   |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          親ジャンル                                                                           |       33        |   楽天ブックスジャンル名   | booksGenreName  |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          親ジャンル                                                                           |       34        |     ジャンル階層      |   genreLevel    |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                            35                                                                            |      自ジャンル      |       \-        |     current     |                                                                  ユーザの入力したジャンルID                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          自ジャンル                                                                           |       36        |  楽天ブックスジャンルID   |  booksGenreId   |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          自ジャンル                                                                           |       37        |   楽天ブックスジャンル名   | booksGenreName  |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          自ジャンル                                                                           |       38        |   ジャンルに紐づく商品数   |    itemCount    |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          自ジャンル                                                                           |       39        |     ジャンル階層      |   genreLevel    |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                            40                                                                            |      子ジャンル      |       \-        |    children     | ユーザの入力したジャンルIDの子ジャンル  
複数の子ジャンルがある場合は<children> ～ </children>が複数生成される  
入力が「booksGenreId=000」の時はgenreLevel=1のジャンルが<children> ～ </children>に表示される |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          子ジャンル                                                                           |       41        |  楽天ブックスジャンルID   |  booksGenreId   |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          子ジャンル                                                                           |       42        |   楽天ブックスジャンル名   | booksGenreName  |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          子ジャンル                                                                           |       43        |   ジャンルに紐づく商品数   |    itemCount    |                                                                                                                                                  |
| ジャンルごとの商品数  
（全体：<GenreInformation>  
～ </GenreInformation> 、  
個別ジャンル：<parent> ～ </parent>  
もしくは<current> ～ </current>  
もしくは<children> ～ </children>） |                                                                          子ジャンル                                                                           |       44        |     ジャンル階層      |   genreLevel    |                                                                                                                                                  |

アフィリエイトに関して

  

デベロッパーは、楽天ブックス雑誌検索APIから取得した商品情報からアフィリエイトURLを作成することが可能です。リンク先にそのアフィリエイトURLを指定することで、[楽天アフィリエイト](https://affiliate.rakuten.co.jp/)経由の成果報酬を獲得することができます。 アフィリエイトURLの作り方は2通りあります。入力パラメーターcarrierでPCが指定された場合でもモバイルが指定された場合でも同様の方法でアフィリエイトURLを作成することができます。  
（1） APIの入力パラメーターに「アフィリエイトID」を含める場合： APIの出力に「アフィリエイトURL」が含まれます。

（2） デベロッパーが自ら、（APIから取得した）「商品URL」と「アフィリエイトID（β版）」から「アフィリエイトURL」を作成する場合： 「アフィリエイトURL」は以下のルールで生成可能です。ただし、「商品URL」の部分はURLエンコードされている必要があります。

```ruby
https://hb.afl.rakuten.co.jp/hgc/[アフィリエイトID]/?pc=[商品URL（PC）]&m=[商品URL（モバイル）]
```

Error

Error messages are displayed in the form of HTTP status code and its response body

| HTTP Status Code |                        Description                         |                                                                                                                            Response body example (JSON)                                                                                                                             |
|------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|       400        | Parameter error (or required parameters were insufficient) | If _applicationId_ is not set

```
{
    "error": "wrong_parameter",
    "error_description": "specify valid applicationId"
}
```

If _keyword_ is not valid (only 1 character given, etc.)

```
{
    "error": "wrong_parameter",
    "error_description": "keyword parameter is not valid"
}
``` |
|       404        |                     If data not found.                     | ```
{
    "error": "not_found",
    "error_description": "not found"
}
``` |
|       429        |                     Too many requests                      | This error will be displayed if the number of API requests has been exceeded.  
Please try access again after an amount of time.

```
{
    "error": "too_many_requests",
    "error_description": "number of allowed requests has been exceeded for this API. please try again soon."
}
``` |
|       500        |           Internal error in Rakuten Web Service            | An internal system error occured. If you continue seeing this message for a long period, please give your inquiry via this link

```
{
    "error": "system_error",
    "error_description": "api logic error"
}
``` |
|       503        |        Unavailable due to maintenance or overloaded        | Maintenance (the API name will be displayed in _XXX/XXX_)

```
{
    "error": "service_unavailable",
    "error_description": "XXX/XXX is under maintenance"
}
``` |

Response body format is display in _format_.

| format |                                                                   Error output example                                                                   |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
|  json  | ```
{
    "error": "wrong_parameter",
    "error_description": "page must be a number"
}
``` |
|  xml   | ```
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <error>wrong_parameter</error>
    <error_description>page must be a number</error_description>
</root>
``` |

-   [APIテストフォーム](https://webservice.rakuten.co.jp/explorer/api/BooksMagazine/Search)