-- データベースの使用を宣言
USE cooking_mama;

-- usersテーブル
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- recipesテーブル
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  description TEXT,
  ingredients JSON NOT NULL,
  steps JSON NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- cooking_historiesテーブル
CREATE TABLE IF NOT EXISTS cooking_histories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  optimized_steps TEXT,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX cooking_histories_user_id_idx (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- history_recipesテーブル
CREATE TABLE IF NOT EXISTS history_recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  history_id INT NOT NULL,
  recipe_id INT NOT NULL,
  INDEX history_recipes_history_id_idx (history_id),
  INDEX history_recipes_recipe_id_idx (recipe_id),
  FOREIGN KEY (history_id) REFERENCES cooking_histories(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
