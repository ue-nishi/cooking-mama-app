# データベース設計

## テーブル構成
| テーブル名 | カラム名 | データ型 | 制約 / 説明 |
| :--- | :--- | :--- | :--- |
| **`users`** | `id` | INT | **PK**, AUTO_INCREMENT |
| | `email` | VARCHAR(255) | **UNIQUE**, NOT NULL |
| | `password` | VARCHAR(255) | NOT NULL (ハッシュ化された文字列) |
| | `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| | `updated_at` | DATETIME | NOT NULL, ON UPDATE CURRENT_TIMESTAMP |
| **`recipes`** | `id` | INT | **PK**, AUTO_INCREMENT |
| | `title` | VARCHAR(255) | NOT NULL |
| | `image_url` | VARCHAR(255)| NULL許容 |
| | `description`| TEXT | NULL許容 |
| | `ingredients`| JSON | NOT NULL (材料リスト) |
| | `steps` | JSON | NOT NULL (手順リスト) |
| | `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| | `updated_at` | DATETIME | NOT NULL, ON UPDATE CURRENT_TIMESTAMP |
| **`cooking_histories`** | `id` | INT | **PK**, AUTO_INCREMENT |
| | `user_id` | INT | **FK** (`users.id`への参照) |
| | `optimized_steps`| TEXT | NULL許容 (OpenAIの生成結果) |
| | `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| **`history_recipes`** | `id` | INT | **PK**, AUTO_INCREMENT |
| | `history_id` | INT | **FK** (`cooking_histories.id`への参照) |
| | `recipe_id` | INT | **FK** (`recipes.id`への参照) |