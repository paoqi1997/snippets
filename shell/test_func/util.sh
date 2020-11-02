:<<!
used by main.sh
!

function add() {
    let $1=$2+$3
    return $(($2+$3))
}

function printInfo() {
    echo 'pid: '$$
    echo 'name: '$0
    echo 'argc: '$1
}
