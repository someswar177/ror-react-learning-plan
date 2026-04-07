require 'rails_helper'

RSpec.describe "FizzBuzz" do
  let(:fizz_buzz) { FizzBuzz.new }
  it "returns 'fizz' for multiples of 3" do
    expect(fizz_buzz.calculate(3)).to eq("fizz")
    expect(fizz_buzz.calculate(6)).to eq("fizz")
  end

  it "returns 'buzz' for multiples of 5" do
    expect(fizz_buzz.calculate(5)).to eq("buzz")
    expect(fizz_buzz.calculate(10)).to eq("buzz")
  end

  it "returns 'fizzbuzz' for multiples of 15" do
    expect(fizz_buzz.calculate(15)).to eq("fizzbuzz")
    expect(fizz_buzz.calculate(30)).to eq("fizzbuzz")
  end

  it "returns the number itself when passed a number which is not multiple of 3,5 or 15" do
    expect(fizz_buzz.calculate(1)).to eq(1)
    expect(fizz_buzz.calculate(2)).to eq(2)
    expect(fizz_buzz.calculate(13)).to eq(13)
    expect(fizz_buzz.calculate(14)).to eq(14)
  end
end
