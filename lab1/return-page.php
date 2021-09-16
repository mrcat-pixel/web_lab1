<?php $time_start = microtime(true); ?>
<tr>
    <td><?php echo $_GET["X"]?></td>
    <td><?php echo $_GET["Y"]?></td>
    <td><?php echo $_GET["R"]?></td>
    <td>
        <?php
        $x = $_GET["X"];
        $y = $_GET["Y"];
        $r = $_GET["R"];
        $ans = false;
        $inc = false;

        if (!check_correct($x, $y, $r)) {
            echo "INCORRECT!";
        }
        elseif (check($x, $y, $r)) {
            echo "да";
        }
        else {
            echo "нет";
        }

        function check($x, $y, $r)
        {
            if ($x < 0) {
                if ($y >= 0) {
                    $ans = top_left_quadrant($x, $y, $r);
                } else {
                    $ans = false;
                }
            } else {
                if ($y >= 0) {
                    $ans = top_right_quadrant($x, $y, $r);
                } else {
                    $ans = bot_right_quadrant($x, $y, $r);
                }
            }
            return $ans;
        }

        function top_left_quadrant($x1, $y1, $r1) {
            if ($x1 < -$r1) {
                return false;
            }
            elseif ($y1 > $r1) {
                return false;
            }
            else {
                return true;
            }
        }

        function top_right_quadrant($x1, $y1, $r1) {
            return ($y1 <= (sqrt((($r1*$r1)-($x1*$x1)))));
        }

        function bot_right_quadrant($x1, $y1, $r1) {
            return ($y1 >= ($x1-$r1));
        }

        function check_correct($x1, $y1, $r1) {
            if (!is_numeric($x1) || !is_numeric($y1) || !is_numeric($r1)) {
                return false;
            }
            if (($x1 < -5) || ($x1 > 3)) {
                return false;
            }
            if (($y1 < -5) || ($y1 > 5)) {
                return false;
            }
            if (($r1 < 1) || ($r1 > 5)) {
                return false;
            }
            return true;
        }
        ?>
    </td>
    <td><?php echo date('Y-m-d H:i:s');?></td>
    <td>
        <?php
        $time_end = microtime(true);
        $time = $time_end - $time_start;
        echo number_format($time, 10);
        echo " с";
        ?>
    </td>
</tr>