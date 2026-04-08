class StringCalculator
    def add(input)
        return 0 if input.empty?
        return input.to_i if input.length == 1
        numbers = input.split(/[,\n]/)
        sum = 0
        for number in numbers
            sum += number.to_i
        end
        return sum
    end
end