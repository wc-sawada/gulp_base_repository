# gulp_base_repository
理想の新規サイトディレクトリ構成を作っていく

# とりあえず理想のディレクトリ構成にしたいけど無理そう
・フレームワーク使いたい  
→今までview配下にhtmlファイルがいたから(PHPでCakePHPがメインだった)PCの中にSPがいるのが個人的に気持ち悪い。

現状)
	SPの階層だけ1階層深くなる
```
top
 ┗index.html
about
 ┗index.html
sp
 ┗top
  ┗index.html
 ┗about
  ┗index.html
```
ex) 理想
```
PC
 ┗top
  ┗index.html
┗about
  ┗index.html
SP
 ┗top
  ┗index.html
 ┗about
  ┗index.html
```

前の現場では  
FrontPC配下にhtmlファイル  
FrontSP配下にhtmlファイル  
→ファイル探しやすい PCはPC！！！SPはSP！！！にしたい。

・階層深くして、url変えずに表示させるファイルの指定方法が分からない  
→いわゆるRouter的な。多分開発側がやってることだから

# 本当の本当は_header.scssや_footer.scssとエレメントごとに分けたい！！！！

けど、一気にやっても大変なので。というか完全新規サイト来たらちゃんと考えたいところです。

# 澤田式ディレクトリ構成
上記は無理そうだからとりあえずこんなサンプルを作りたい…


・共通のものはディレクトリ直下に置く。
・コンパイルしたくないファイル冒頭に_を付ける。

```
/scss
 ┗common
  ┗_variable.scss		全体で使用したいsass変数管理ファイル
  ┗_mixin.scss			全体で使用したいmixin管理ファイル
  ┗_reset.scss			リセット
  ┗_common.scss			全体共通
 ┗sp_common
  ┗_variable.scss		全体で使用したいsass変数管理ファイル
  ┗_mixin.scss			全体で使用したいmixin管理ファイル
  ┗_reset.scss			リセット
  ┗_common.scss			全体共通

↑全体共通系(common/commonは、どうなのか？とは思うｗ)
----------------------------------------------------------------------------------------
↓ページ内独自

 ┗/top					ページ名のディレクトリ
  ┗_variable.scss		ページで使用したいsass変数管理ファイル(不要であれば作成しない)
  ┗_mixin.scss			ページで使用したいmixinファイル(不要であれば作成しない)
  ┗style.scss			必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる
  ┗_sp_variable.scss	ページで使用したいsass変数管理ファイル(不要であれば作成しない)
  ┗_sp_mixin.scss		ページで使用したいmixinファイル(不要であれば作成しない)
  ┗sp_style.scss		必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる
```

出力結果
```
/css
 ┗/top
  ┗style.css			１ファイルで完結させる
  ┗sp_style.css			１ファイルで完結させる
```

# topディレクトリ配下のstyle.scssとsp_style.scssの中身
必要ファイルのみimportする  
基本ルールで読み込み順は  

>1.variable(変数)  
>2.mixin(関数)  
>3.reset  
>4.common  
>5.自由に記述

ex) top/style.scss
```
@import ‘../common/_variable’;	全体共有の変数管理ファイル
@import ‘./_variable’;	ページ内のみで使用する変数管理ファイル
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
@import ‘./_sp_variable’;	ページ内のみで使用する変数管理ファイル
@import ‘../sp_common/_mixin’;	全体共有のmixinファイル
@import ‘./_sp_mixin’;		ページ内のみで使用するmixinファイル
@import ‘../sp_common/_reset’;
@import ‘../sp_common/_common’;

/* mainVisual */
.mainVisual .text {
	color: red;
}
```