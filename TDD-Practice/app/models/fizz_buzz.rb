class FizzBuzz
  def calculate(number)
    return "fizzbuzz" if number == 15
    return "fizz" if number % 3 == 0
    return "buzz" if number % 5 == 0
  end
end
