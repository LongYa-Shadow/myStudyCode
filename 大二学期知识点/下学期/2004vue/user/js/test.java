public class test{

  public static void main(String[] args){
    //冒泡排序
    int[] arr = {1,2,3,4,5,6,7,8,9,10};
    int temp = 0;
    for(int i = 0; i < arr.length; i++){
      for(int j = 0; j < arr.length - i - 1; j++){
        if(arr[j] > arr[j+1]){
          temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
  }
}