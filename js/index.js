

var remin = angular.module('reminder',[]);

remin.controller('main',['$scope',function($scope){
  $scope.colors=['pink','green','blue','yellow','orange','purple','brow']
    $scope.cates=[
     {id:1,theme:'pink',title:'新列表1',
         todo:[{id:1001,state:1},
             {id:1002,state:0}
         ]
     },
    {id:2,theme:'green',title:'新列表2',
        todo:[]
    },
    {id:3,theme:'blue',title:'新列表3',todo:[{id:1001}]},
    {id:4,theme:'yellow',title:'新列表4', todo:[{id:1001}]},
    {id:5,theme:'orange',title:'新列表5', todo:[{id:1001}]},
    {id:6,theme:'purple',title:'新列表6', todo:[{id:1001}]},
    {id:7,theme:'brow',title:'新列表7', todo:[{id:1001}]}
 ]
    $scope.wancheng = function(){
        var num = $('.yiwancheng li').length;
        return num;
    }
    $scope.zhuan = function(){
        $('.yiwancheng .wanbox .wanicon').toggleClass('active');
        $('.yiwancheng li').toggleClass('chuxian');

    }

   //新条目
    $scope.newadd=function(){
        var max_id = -Infinity;
        $scope.current.todo.forEach(function(v){
            if(max_id<v.id){
                max_id = v.id;
            }
        });
        var id=max_id+1;
        var item={
            id:id,
            title:$scope.item,
            state:0
        };
        $scope.current.todo.push(item);
        $scope.item='';
    }
    $scope.pao = function(e){
        e.stopPropagation();
    }
$scope.delete=function(id) {
      $scope.current.todo = $scope.current.todo.filter(function(v,i) {
          return v.id != id;
      })
    }

    $scope.dele=function(id){
        var a =0;
        $scope.cates.forEach(function(v,i){
            if (id == v.id){
                a = i
            }
        });
        $scope.cates = $scope.cates.filter(function(v){
            return v.id !== id
        });
        $scope.current = $scope.cates[a];
    }

//current 当前
    $scope.current=$scope.cates[0];
    $scope.setcurrent=function(v){
       $scope.current=v;
    }

  $scope.addtodo=function(e){
        if(e.keyCode===13){
            var max_id=-Infinity;
            $scope.current.todo.forEach(function(v,i){
                if(max_id<v.id){
                    max_id= v.id
                }
            })
            var id=max_id+1;
            var item={
                id:id,
                title:$scope.item,
               state:0
            }
            $scope.current.todo.push(item);
            $scope.item='';
        }
  }



      $scope.add=function(){
  var colors=['pink','green','blue','yellow','orange','purple','brow']
   var max_id=-Infinity;
   $scope.cates.forEach(function(v,i){
       if(max_id<v.id){
           max_id= v.id
       }
   })
   var id=max_id+1;
    item={
             id:id,
            theme: colors[$scope.cates.length %7],
             title:'新列表'+($scope.cates.length+1),
            todo:[]
    }
 $scope.cates.push(item)
}


}])
/*remin.directive('colorLi',[function(){
    return{
        restrict:'AE',
        replace:true,
        template:' <li><div class="licon {{v.theme}}"></div><sapn>{{v.title}}</sapn><input type="text" value="{{v.title}}"></li>',
        link:function(scope,el){
        $(el).on('mousedown',false)
            $(el).on('dblclick',function(){
                var binding=$(this).find('.ng-binding');
                binding.addClass('yincang')
                var input=$(this).find('input');
               input.addClass('bianji')
               input.val(input.val()).focus();
            })
          /!*  $(el).on('click',function(){
            $(this).addClass('active')
            })*!/
           $(el).find('input').on('blur',function(){
             $(this).closest('li').removeClass('bianji')
             })
        }
    }
}])*/

remin.directive('ngColorUl',[function(){
       return{
        restrict:'AE',
        replace:true,
        transclude:true,
        template:'<ul class="lists-left"><div ng-transclude></div></ul>',
        link:function(scope , el){
            $(el).on('click','li', function () {
                $(el).find('.xuangzhong').removeClass('xuangzhong bianji')

                $(this).addClass('xuangzhong')

            })

            $(el).on('dblclick','li',function () {
                $(el).on('mousedown', false)

                var input = $(this).find('input');
                  input.addClass('bianji')
                input.val(input.val()).focus();
            })

            $(el).on('blur', 'li' ,function () {
                $(this).removeClass('xuangzhong')
            })
             $(el).on('keyup',false)
          $(document).on('keyup', function (e) {
              if (e.keyCode===8) {
                  var id = parseInt($(el).find('.xuangzhong').attr('data-id'))

                        scope.$apply(function () {
                            scope.cates = scope.cates.filter(function (v) {
                                return v.id !== id;
                            })

                        })
                    }
                })
        }
        }
}])


remin.directive('myop',[function(){
    return{
        restrict:'AE',
        replace:true,
        transclude:true,
        template:'<div><div ng-transclude></div></div>',
        link:function(scope,el){
            $(el).find('.xuan').on('click',function(){
             /*   $(el).find('.box').toggle();*/
                return false;
            })
           /* $(el).find('.box').on('click',false);*/
            $(el).find('.cancle').on('click',function(){
                $(el).find('.box').hide()
            })
          /*  $(document).find('.xuan').on('click',function(){
                $(el).find('.box').toggle();
            })*/

        }
    }
}])




