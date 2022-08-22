const stubs = {}

stubs.cpp = `#include<iostream>
using namespace std;

int main(){
    cout<<"Hello world!\\n";
    return 0;
}
`

stubs.py = `print('Hello World!')`

stubs.js = `console.log('Hello World!')`

stubs.java = `public class Main{
    public static void main(String args[])
    {
        System.out.println("Hello World!");
    }
}
`

export default stubs