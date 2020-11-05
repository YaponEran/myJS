line_num = 0
input = ""

loop do
  print "#{line_num += 1} ?: "
  line = gets
  break if line.strip == 'exit' #strip delteing all empty strings

  if line.strip == ''
    puts "Evaliating..."
    puts eval(line)
    input = ""
  else
    input += line
  end
  
end
#--------------------------------------------

obj = Object.new
obj.instance_eval(" def m
                      puts 'hello'
                    end")
obj.m


#--------------------------------------------
class Foo
  def initialize
    @bar = "instance var"
  end

  private
  def private_method
    puts "I am private method"
  end
end

foo = Foo.new
puts foo.instance_eval('@bar')
puts foo.instance_eval('private_method')

foo.instance_eval do
  def m
    puts "public method"
    puts "Intance variable #{@bar}"
    private_method
  end
end

foo.m



#--------------------------------------------
module X
end

class Y
  @@y = 12
  include X
end

puts Y.class_eval('@@y')

Y.class_eval do
  def m
    puts "Hello"
  end
end

X.module_eval do
  def module_method
    puts "module method"
  end
end

y = Y.new
y.m
y.module_method

#--------------------------------------------

module X
end

class Y
  @@y = 12
  include X
end

puts Y.class_eval('@@y')

Y.class_eval do
  def m
    puts "Hello"
  end
end

X.module_eval do
  def module_method
    puts "module method"
  end
end

puts Y.class_variables
puts Y.class_variable_get :@@y
Y.class_variable_set :@@y, 45
puts Y.class_variable_get :@@y

puts '--------------------------------'

Y.class_variable_set :@@x, 34
puts Y.class_variables

puts '--------------------------------'

y = Y.new
y.instance_variable_set :@name, 'eran'
puts y.instance_variable_get :@name


#------------------------------------------------
class Y
  define_method(:my_method) do
    puts "My method"
  end
end

y = Y.new
y.my_method


#------------------------------------------------
module MyAttrAccessor
  def my_attr_accessor(name)
    var_name = "@#{name}".to_sym
    define_method(name){ instance_variable_get(var_name)}
    define_method("#{name}=".to_sym){| value | instance_variable_set(var_name, value)}
  end
end

class Test
  extend MyAttrAccessor
  my_attr_accessor :my_attr
end

test = Test.new
puts test.my_attr
test.my_attr = 5
puts test.my_attr
puts "---------------"
puts test.instance_variables


#------------------------------------------------
module MyAttrAccessor
  def my_attr_accessor(*names)
   names.each do |name|
     var_name = "@#{name}".to_sym
    define_method(name){ instance_variable_get(var_name)}
    define_method("#{name}=".to_sym){| value | instance_variable_set(var_name, value)}
   end
  end
end

class Test
  extend MyAttrAccessor
  my_attr_accessor :my_attr, :a, :b, :c
end

test = Test.new
puts test.my_attr
test.my_attr = 5
test.a = "Alka"
test.b = 1 + 1
test.c = 10
puts test.my_attr
puts "---------------"
puts test.instance_variables


#-------------------------------------------
#methis missing

class X 
  def m
    puts 'Hello'
  end
  def method_missing(name, *args)
    puts "called method with #{name}, with arguments #{args}"
  end
end

x = X.new
x.m

x.abc
x.my_met(1, 1, 3, 3, '4')
