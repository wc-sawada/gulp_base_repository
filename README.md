# gulp_base_repository
理想の新規サイトディレクトリ構成を作っていく

# とりあえず理想のディレクトリ構成にしたいけど無理そう
・フレームワーク使いたい  
　→今までview配下にhtmlファイルがいたから(PHPでCakePHPがメインだった)PCの中にSPがいるのが個人的に気持ち悪い。
　また、MVCだとview配下にhtml記述 srcやwebroot配下にJS,CSS,IMGおいていたので、そういう構成にしたい。assetsとか。
　

現状)
	SPの階層だけ1階層深くなる
```
top
┠ index.html
about
┠ index.html
sp
┠ top
│ ┠ index.html
┠ about
│ ┠ index.html
```
ex) 理想
```
PC
┠ top
│ ┠ index.html
┠ about
│ ┠ index.html
SP
┠ top
│ ┠ index.html
┠ about
│ ┠ index.html

assets
┠ css
│ ┠ PC
│ │ ┠ top
│ │ │ ┠ style.css
│ │ ┠ about
│ │ │ ┠ style.css
│ ┠ SP
│ │ ┠ top
│ │ │ ┠ style.css
│ │ ┠ about
│ │ │ ┠ style.css
┠ scss
│ ┠ PC
│ │ ┠ top
│ │ │ ┠ style.css
│ │ ┠ about
│ │ │ ┠ style.css
│ ┠ SP
│ │ ┠ top
│ │ │ ┠ style.css
│ │ ┠ about
│ │ │ ┠ style.css
┠ img

┠ js



```

前の現場では  
FrontPC配下にhtmlファイル  
FrontSP配下にhtmlファイル  
　→ファイル探しやすい  
　PCはPC！！！SPはSP！！！にしたい。


## 本当は_header.scssや_footer.scss…エレメントごとに分けたい

けど、一気にやっても大変なので。  
というか完全新規サイト来たらちゃんと考えたいところです。  

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
```
┠ pc
│ ┠ top
│ │ ┠ ┗index.html
│ ┠ about
│ │ ┠ index.html
┠ sp
│ ┠ top
│ │ ┠ index.html
│ ┠ about
│ │ ┠ index.html
```

# 「SCSS編」
・共通のものはディレクトリ直下に置く。  
・コンパイルしたくないファイル冒頭に_を付ける。

```
scss/
┠pc
│ ┠ common/
│ │ ┠ _variable.scss		全体で使用したいsass変数管理ファイル
│ │ ┠ _mixin.scss			全体で使用したいmixin管理ファイル
│ │ ┠ _reset.scss			リセット
│ │ ┠ _common.scss			全体共通
↑全体共通系(common/commonは、どうなのか？とは思うｗ)
----------------------------------------------------------------------------------------
↓ページ内独自
│ ┠ top/				ページ名のディレクトリ
│ │ ┠ _variable.scss		ページで使用したいsass変数管理ファイル(不要であれば作成しない)
│ │ ┠ _mixin.scss			ページで使用したいmixinファイル(不要であれば作成しない)
│ │ ┠ style.scss			必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる

┠sp
│ ┠ common/
│ │ ┠ _variable.scss		全体で使用したいsass変数管理ファイル
│ │ ┠ _mixin.scss			全体で使用したいmixin管理ファイル
│ │ ┠ _reset.scss			リセット
│ │ ┠ _common.scss			全体共通

↑全体共通系(common/commonは、どうなのか？とは思うｗ)
----------------------------------------------------------------------------------------
↓ページ内独自
│ ┠ top/				ページ名のディレクトリ
│ │ ┠ _variable.scss		ページで使用したいsass変数管理ファイル(不要であれば作成しない)
│ │ ┠ _mixin.scss			ページで使用したいmixinファイル(不要であれば作成しない)
│ │ ┠ style.scss			必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる
```

出力結果
```
css/
┠ top/
│ ┠ style.css			１ファイルで完結させる
│ ┠ sp_style.css			１ファイルで完結させる
```

# topディレクトリ配下のstyle.scssとsp_style.scssの中身
必要ファイルのみimportする  

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

# 「images編」  
圧縮対象ディレクトリと圧縮出力先のディレクトリが必要  
```
images/		出力先
 ┠top/
│ ┠ main_visual.png

before_images/	圧縮対象 ←良いディレクトリ名が思いつかないｗｗｗｗｗｗ
 ┠top/
│ ┠ main_visual.png
```

before_images/はgit管理で、images/配下のみサーバーに上げるイメージ  
プロジェクトは確かに肥大化するかもだけど、一応圧縮前画像は持っておきたい。  
(圧縮後荒れすぎたりしたとき差し替えられるように)

# クリティカルパス できるかわからないけどやってみる

http://blog.yuhiisk.com/archive/2015/06/22/about-critical-css.html#CSS-3

https://github.com/addyosmani/critical-path-css-demo




# ルール系まとめ

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