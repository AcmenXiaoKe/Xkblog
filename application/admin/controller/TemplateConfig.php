<?php


namespace app\admin\controller;


use think\Controller;
use think\facade\Env;
use think\Request;

class TemplateConfig extends Controller
{
    public function index()
    {
        $data = include Env::get('config_path').'TemplateConfig.php';
        $this->assign([
            'data'      =>      $data
        ]);
        return $this->fetch('/template-config');
    }
    public function edit(Request $request)
    {
        $result=  $request->post();
        $code = <<<INFO
<?php
return [
    'logo'              =>      '{$result['logo']}',
    'Introduction'      =>      '{$result['Introduction']}',
    'live2dModel'       =>       '{$result['live2dModel']}',
]; 
INFO;
        file_put_contents(Env::get('config_path').'TemplateConfig.php', $code);
        return redirect('/admin/template_config');
    }
}