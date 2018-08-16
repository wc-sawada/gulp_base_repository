# gulp_base_repository
理想の新規サイトディレクトリ構成を作っていく

## とりあえず理想のディレクトリ構成にしたいけど無理そう
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
ex)
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

・表示させるファイルの指定方法が分からない  
→いわゆるRouter的な。多分開発側がやってることだから

### 想定しているディレクトリ構成
上記は無理そうだからとりあえずこんなサンプルを作りたい…

```
・共通のものはディレクトリ直下に置く。
・コンパイルしたくないファイル冒頭に_を付ける。

/scss
 ┗_variable.scss		全体で使用したいsass変数管理ファイル
 ┗_mixin.scss			全体で使用したいmixin管理ファイル
 ┗_reset.scss			リセット
 ┗_common.scss			全体共通
----------------------------------------------------------------------------------------
 ┗/top					ページ名のディレクトリ
  ┗_variable.scss		ページで使用したいsass変数管理ファイル(不要であれば作成しない)
  ┗_mixin.scss			ページで使用したいmixinファイル(不要であれば作成しない)
  ┗style.scss			必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる

  ┗_sp_variable.scss	ページで使用したいsass変数管理ファイル(不要であれば作成しない)
  ┗_sp_mixin.scss		ページで使用したいmixinファイル(不要であれば作成しない)
  ┗sp_style.scss		必要なファイルのみ@importで読み込む　★このファイルがコンパイルされる


出力先
/css
 ┗/top
  ┗style.css		１ファイルで完結させる
  ┗sp_style.css		１ファイルで完結させる


@import ‘../_variable’;	全体共有の変数管理ファイル
@import ‘./_variable’;	ページ内で使用する変数管理ファイル
@import ‘../_variable’;	全体共有の変数管理ファイル

@import ‘../_reset’;
@import ‘../_common’;
@import ‘../_content’;
@import ‘../_company02’;
```