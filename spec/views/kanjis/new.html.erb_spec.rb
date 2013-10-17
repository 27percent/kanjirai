require 'spec_helper'

describe "kanjis/new" do
  before(:each) do
    assign(:kanji, stub_model(Kanji,
      :imageUrl => "MyString",
      :symbolName => "MyString"
    ).as_new_record)
  end

  it "renders new kanji form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", kanjis_path, "post" do
      assert_select "input#kanji_imageUrl[name=?]", "kanji[imageUrl]"
      assert_select "input#kanji_symbolName[name=?]", "kanji[symbolName]"
    end
  end
end
