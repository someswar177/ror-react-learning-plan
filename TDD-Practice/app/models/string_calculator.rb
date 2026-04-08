class StringCalculator
    def add(input)
        return 0 if input.empty?
        return input.to_i if input.length == 1
        delimiter = /[,\n]/ 
        if input.start_with?("//")
            delimiter = input[2]
            input = input.split("\n")[1]
            # //.to_i is returning 0 so we need to remove it from the input string
        end
        numbers = input.split(delimiter)
        sum = 0
        negatives = []
        for number in numbers
            if number.to_i < 0
                negatives << number.to_i
            end
            sum += number.to_i
        end
        if negatives.any?
            raise "negatives not allowed: #{negatives.join(" ")}"
        end
        return sum
    end
end