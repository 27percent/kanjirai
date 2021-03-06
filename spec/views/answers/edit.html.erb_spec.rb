require 'spec_helper'

describe "answers/edit" do
  before(:each) do
    @answer = assign(:answer, stub_model(Answer,
      :imageUrl => "MyString",
      :kanjiId => 1
    ))
  end

  it "renders the edit answer form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", answer_path(@answer), "post" do
      assert_select "input#answer_imageUrl[name=?]", "answer[imageUrl]"
      assert_select "input#answer_kanjiId[name=?]", "answer[kanjiId]"
    end
  end
end
