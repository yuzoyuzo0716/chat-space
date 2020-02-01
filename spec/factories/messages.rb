FactoryBot.define do
  factory :group do
    name {Faker::Team.name}
  end
end

FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length: 8)
    name {Faker::Name.last_name}
    email {Faker::Internet.free_email}
    password {password}
    password_confirmation {password}
  end
end

FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
  end
end