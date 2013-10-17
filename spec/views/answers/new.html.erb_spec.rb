require 'spec_helper'

describe "answers/new" do
  before(:each) do
    assign(:answer, stub_model(Answer,
      :imageUrl => "MyString",
      :kanjiId => 1
    ).as_new_record)
  end

  it "renders new answer form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", answers_path, "post" do
      assert_select "input#answer_imageUrl[name=?]", "answer[imageUrl]"
      assert_select "input#answer_kanjiId[name=?]", "answer[kanjiId]"
    end
  end
end
