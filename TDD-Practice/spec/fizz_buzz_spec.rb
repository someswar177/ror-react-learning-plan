require 'rails_helper'

RSpec.describe "FizzBuzz" do
  it "returns 'fizz' when passed 3" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(3)).to eq("fizz")
  end

  it "returns 'fizz' when passed 6" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(6)).to eq("fizz")
  end

  it "returns 'buzz' when passed 5" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(5)).to eq("buzz")
  end

  it "returns 'buzz' when passed 10" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(10)).to eq("buzz")
  end

  it "returns 'fizzbuzz' when passed 15" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(15)).to eq("fizzbuzz")
  end

  it "returns 'fizzbuzz' when passed 30" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(30)).to eq("fizzbuzz")
  end
end
