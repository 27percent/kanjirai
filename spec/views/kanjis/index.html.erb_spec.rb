require 'spec_helper'

describe "kanjis/index" do
  before(:each) do
    assign(:kanjis, [
      stub_model(Kanji,
        :imageUrl => "Image Url",
        :symbolName => "Symbol Name"
      ),
      stub_model(Kanji,
        :imageUrl => "Image Url",
        :symbolName => "Symbol Name"
      )
    ])
  end

  it "renders a list of kanjis" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Image Url".to_s, :count => 2
    assert_select "tr>td", :text => "Symbol Name".to_s, :count => 2
  end
end
