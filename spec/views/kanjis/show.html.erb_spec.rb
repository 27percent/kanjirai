require 'spec_helper'

describe "kanjis/show" do
  before(:each) do
    @kanji = assign(:kanji, stub_model(Kanji,
      :imageUrl => "Image Url",
      :symbolName => "Symbol Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Image Url/)
    rendered.should match(/Symbol Name/)
  end
end
