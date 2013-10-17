require 'spec_helper'

describe "kanjis/edit" do
  before(:each) do
    @kanji = assign(:kanji, stub_model(Kanji,
      :imageUrl => "MyString",
      :symbolName => "MyString"
    ))
  end

  it "renders the edit kanji form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", kanji_path(@kanji), "post" do
      assert_select "input#kanji_imageUrl[name=?]", "kanji[imageUrl]"
      assert_select "input#kanji_symbolName[name=?]", "kanji[symbolName]"
    end
  end
end
