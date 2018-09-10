# gulp_base_repository
理想の新規サイトディレクトリ構成を作っていく

# とりあえず理想のディレクトリ構成にしたいけど無理そう
・フレームワーク使いたい  
　→今までview配下にhtmlファイルがいたから(PHPでCakePHPがメインだった)PCの中にSPがいるのが個人的に気持ち悪い。
https://fwww.me/2018/06/15/website-directory/
https://qiita.com/y_hokkey/items/871c23c24d31021d7c40
　 MVCだとview配下にhtml記述 srcやwebroot配下にJS,CSS,IMGおいていたので、そういう構成にしたい。assetsとか。

現状)
	SPの階層だけ1階層深くなる
```
index.html
about/
│ ┠ index.html
sp/
│ ┠ index.html
│ ┠ about/
│ │ ┠ index.html
```
ex) 理想
```
pc/
│ ┠ top/
│ │ ┠ index.html
│ ┠ about/
│ │ ┠ index.html
sp/
│ ┠ top/
│ │ ┠ index.html
│ ┠ about/
│ │ ┠ index.html
assets/
│ ┠ css/
│ │ ┠ pc/
│ │ │ ┠ top/
│ │ │ │ ┠ style.css
│ │ │ ┠ about
│ │ │ │ ┠ style.css
│ │ ┠ sp/
│ │ │ ┠ top/
│ │ │ │ ┠ style.css
│ │ │ ┠ about/
│ │ │ │ ┠ style.css
│ │ ┠ cmn/
│ │ │ ┠ plugin.css
│ ┠ scss/
│ │ ┠ pc/
│ │ │ ┠ top/
│ │ │ │ ┠ style.css
│ │ │ ┠ about/
│ │ │ │ ┠ style.css
│ │ ┠ sp/
│ │ │ ┠ top/
│ │ │ │ ┠ style.css
│ │ │ ┠ about/
│ │ │ │ ┠ style.css
│ ┠ img/
│ │ ┠ pc/
│ │ │ ┠ top/
│ │ │ │ ┠ top.jpg
│ │ │ ┠ about/
│ │ │ │ ┠ about.jpg
│ │ ┠ sp/
│ │ │ ┠ top/
│ │ │ │ ┠ top.jpg
│ │ │ ┠ about/
│ │ │ │ ┠ about.jpg
│ │ ┠ cmn/
│ │ │ ┠ plugin.jpg
│ ┠ js/
│ │ ┠ pc/
│ │ │ ┠ script.js
│ │ ┠ sp/
│ │ │ ┠ script.js
│ │ ┠ cmn/
│ │ │ ┠ plugin.js
```

前の現場では  
FrontPC配下にhtmlファイル  
FrontSP配下にhtmlファイル  
　→ファイル探しやすい  
　PCはPC！！！SPはSP！！！にしたい。

# 一般的なディレクトリ構成は…
```
root/
┠ dist/ (書き出し先)
│ ┠ hogehoge.html
│ ┠ css/
│ ┠ js/
│ ┠ assets/images/
┠ src/ (コンパイル前)
│ ┠ scss/ 
│ ┠ images/
└ gulpfile.js
```

・distで階層深くして、url変えずに表示させるファイルの指定方法が分からないｗ  
　→いわゆるRouter的な。多分開発側がやってることだから

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓上記は無理そうだからとりあえずこんなサンプルを作りたい↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

# 「HTML編」
フレームワークではないので、静的ならばあまり変えず、現状に近いほうがいいかな、と
```
index.html
about/
│ ┠ index.html
┠ sp
│ ┠ index.html
│ ┠ about/
│ │ ┠ index.html
```

# 下記からは(CSS, JS, IMG)assets配下に入れる想定

# 「SCSS編」
・共通のものはディレクトリ直下に置く。  
・コンパイルしたくないファイル冒頭に_を付ける。

本当は_header.scssや_footer.scss…エレメントごとに分けたい
けど、一気にやっても大変なので。  
というか完全新規サイト来たらちゃんと考えたいところです。  

```
assets/scss/
┠ pc/
----------------------------------------------------------------------------------------
↓全体共通系
│ ┠ common/
│ │ ┠ _variable.scss		全体で使用したいsass変数管理ファイル
│ │ ┠ _mixin.scss			全体で使用したいmixin管理ファイル
│ │ ┠ _reset.scss			リセット
│ │ ┠ _common.scss			全体共通　(common/commonは、名前どうなのか？とは思うｗ)
----------------------------------------------------------------------------------------
↓ページ内独自
│ ┠ top/				ページ名のディレクトリ
│ │ ┠ _variable.scss		ページで使用したいsass変数管理ファイル(不要であれば作成しない)
│ │ ┠ _mixin.scss			ページで使用したいmixinファイル(不要であれば作成しない)
│ │ ┠ style.scss			必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる
┠ SP/
----------------------------------------------------------------------------------------
↓全体共通系
│ ┠ common/
│ │ ┠ _variable.scss		全体で使用したいsass変数管理ファイル
│ │ ┠ _mixin.scss			全体で使用したいmixin管理ファイル
│ │ ┠ _reset.scss			リセット
│ │ ┠ _common.scss			全体共通
----------------------------------------------------------------------------------------
↓ページ内独自
│ ┠ top/				ページ名のディレクトリ
│ │ ┠ _variable.scss		ページで使用したいsass変数管理ファイル(不要であれば作成しない)
│ │ ┠ _mixin.scss			ページで使用したいmixinファイル(不要であれば作成しない)
│ │ ┠ style.scss			必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる
```

出力結果
```
assets/css/
│ ┠ pc/
│ │ ┠ top/
│ │ │ ┠ style.css	resetもcommonmoも独自も１ファイルでスタイル完結させる
│ │ ┠ about
│ │ │ ┠ style.css
│ ┠ sp/
│ │ ┠ top/
│ │ │ ┠ style.css
│ │ ┠ about/
│ │ │ ┠ style.css
│ ┠ cmn/			プラグイン置く(わざわざscssに入れる必要ないのでcss/のみ)
│ │ ┠ plugin/
│ │ │ ┠ plugin.css
```

# 「JS編」
```
assets/js/
┠ pc/
│ ┠ script.js
┠ sp/
│ ┠ script.js
┠ cmn/
│ ┠ script.js
│ ┠ plugin/			プラグイン置く
│ │ ┠ plugin.js
```

# 「IMG編」
```
assets/img/
┠ pc/
│ ┠ top/
│ │ ┠ main.jpg
│ ┠ common/
│ │ ┠ top_icon.png
┠ sp/
│ ┠ top/
│ │ ┠ main.jpg
│ ┠ common/
│ │ ┠ top_icon.png
┠ cmn/
│ ┠ banner.jpg

assets/watchImg/		圧縮対象(ignore対象なので、コミットはしない)
┠ pc/
│ ┠ top/
│ │ ┠ main.jpg
│ ┠ common/
│ │ ┠ top_icon.png
┠ sp/
│ ┠ top/
│ │ ┠ main.jpg
│ ┠ common/
│ │ ┠ top_icon.png
┠ cmn/
│ ┠ banner.jpg

```
assets/img/配下のみサーバーに上げるイメージ  
プロジェクトは確かに肥大化するかもだけど、一応圧縮前画像は持っておきたい。(watchImg)  
(圧縮後荒れすぎたりしたとき差し替えられるように)
↑ignoreでコミット対象外とし、肥大化を防止する。

# クリティカルパス できるかわからないけどやってみる

http://blog.yuhiisk.com/archive/2015/06/22/about-critical-css.html#CSS-3

https://github.com/addyosmani/critical-path-css-demo


# ルール系まとめ

## style.scssとsp_style.scssの中身
そのページに必要ファイルのみimportする  

>＜基本ルール import読み込み順＞  
>1.variable(変数)  
>2.mixin(関数)  
>3.reset  
>4.common  
>5.自由に記述

ex) top/style.scss
```
@import ‘../common/_variable’;	全体共有の変数管理ファイル
@import ‘./_variable’;		ページ内のみで使用する変数管理ファイル
@import ‘../common/_mixin’;	全体共有のmixinファイル
@import ‘./_mixin’;		ページ内のみで使用するmixinファイル
@import ‘../common/_reset’;
@import ‘../common/_common’;

/* mainVisual */
.mainVisual .text {
	color: red;
}
```

ex) top/sp_style.scss
```
@import ‘../sp_common/_variable’;	全体共有の変数管理ファイル
@import ‘./_sp_variable’;		ページ内のみで使用する変数管理ファイル
@import ‘../sp_common/_mixin’;		全体共有のmixinファイル
@import ‘./_sp_mixin’;			ページ内のみで使用するmixinファイル
@import ‘../sp_common/_reset’;
@import ‘../sp_common/_common’;

/* mainVisual */
.mainVisual .text {
	color: red;
}
```
## mixinのルール
- 何のためのmixinなのかをコメントする
- 引数があるのであればどんな値を渡すのかをコメントする
- コメントはコンパイル出力されないように/**/ではなく、「//」で書く
- 使用されている箇所があるのなら明確にしておく

```
// btnスタイル 基本型
// $btn_name…数字で色とフォントカラーが変わります。mixin内部を参考に指定してください。初期値はentry。
// $padding…ボタンのpadding。初期値は18px 0 18px 10px。
@mixin btn_base_style($btn_name:entry, $padding:18px 0 18px 10px) {
	display: block;
	padding: $padding;
	font-size: 18px;
	font-weight: bold;
	letter-spacing: 2px;
	text-align: center;
	box-shadow: 0 2px 3px 0 rgba(153, 153, 153, 0.4);
	border-radius: 8px;
	cursor: pointer;

	// かんたん検索のボタン、応募するボタン、応募完了のTOPへ戻るボタン
	@if $btn_name == entry {
		color: $white;
		background-color: #ed236a;
		border: 2px solid #f47ba6;
	// 前回の検索、キープ解除ボタン、かんたん検索の条件リセットボタン
	} @else if $btn_name == reset {
		color: $white;
		background-color: #b1a1a7;
		border: 2px solid #d0c7ca;
	// サロン紹介ボタン、詳細を見るボタン、住所自動入力ボタン
	} @else if $btn_name == detail {
		color: $white;
		background-color: #f14f88;
		border: 2px solid #f795b8;
	// デザインもっと見るボタン、キープするボタン、ページネーション
	} @else if $btn_name == more {
		color: $white;
		background-color: #f47ba6;
		border: 2px solid #f8b0ca;
	// 修正ボタン
	} @else if $btn_name == edit {
		color: #876e77;
		background-color: #e0d9dc;
		border: 2px solid #ece8ea;
	}
}
```