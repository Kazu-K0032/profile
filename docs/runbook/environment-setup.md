# 環境構築

ローカルで開発サーバーを起動するまでの手順。パッケージマネージャは pnpm を使う。

## リポジトリのクローン

```bash
git clone https://github.com/Kazu-K0032/profile.git
cd profile
```

## 依存関係のインストール

```bash
pnpm install
```

## 環境変数の設定

`env.example` を `.env.local` にコピーし、値を入れる。変数の一覧と説明は `env.example` を見る。

```bash
cp env.example .env.local
```

## サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` を開いて確認する。
