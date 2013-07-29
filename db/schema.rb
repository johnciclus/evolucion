# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20130530230822) do

  create_table "behaviors", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "element_infs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "element_safs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "equations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "influences", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "models", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "projects", force: true do |t|
    t.string   "title",       null: false
    t.string   "description", null: false
    t.string   "author",      null: false
    t.string   "keywords",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "proses", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "relation_infs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "relation_safs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sector_infs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sector_safs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "stockandflows", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "usertypes", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "views", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
