DB設計

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group-id|integer|null:false, foreign_key:true|
|body|text|null: false|
|image|string| ||
|created_at|text||null:false|


### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|text|null:false|
|password|text||null:false|
|name|string||null:false|
|group-id|integer|null:false,foreign_key: true|

### Association
- has_many :messages
- has_many :groups, through: :users-groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|g-name|string||null: false|
|user-id|integer|null:false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :users-groups

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user